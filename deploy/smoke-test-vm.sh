#!/usr/bin/env bash
set -euo pipefail

# Uso:
#   ./deploy/smoke-test-vm.sh <ssh_host>
#
# Pega al Service desde la VM (port-forward) y verifica /health, el home
# pre-renderizado y que una ruta inexistente responda 404.

SSH_HOST="${1:-}"
[[ -n "$SSH_HOST" ]] || { echo "Uso: $0 <ssh_host>"; exit 1; }

ssh "$SSH_HOST" 'bash -s' <<'REMOTE'
set -euo pipefail
kubectl port-forward svc/adini-web 18093:80 -n default >/tmp/adini-web-pf.log 2>&1 &
PF_PID=$!
trap 'kill $PF_PID 2>/dev/null || true' EXIT
for i in $(seq 1 20); do
  curl -fsS http://127.0.0.1:18093/health >/dev/null 2>&1 && break
  sleep 0.5
done

fail=0
check() { # <ruta> <código esperado>
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:18093$1" || true)
  echo "$1 -> $code (esperado $2)"
  [[ "$code" == "$2" ]] || fail=1
}
check /health 200
check / 200
check /ia 200
check /sitemap.xml 200
check /no-existe 404

curl -s http://127.0.0.1:18093/ | grep -q 'data-prerendered="true"' \
  && echo "home pre-renderizado: ok" \
  || { echo "home sin pre-renderizar"; fail=1; }

exit $fail
REMOTE
