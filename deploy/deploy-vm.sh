#!/usr/bin/env bash
set -euo pipefail

# Uso:
#   ./deploy/deploy-vm.sh <ssh_host> <image_ref>
# Ejemplo:
#   ./deploy/deploy-vm.sh golivieri@ssh.adini.com.ar ghcr.io/adini-solutions/adini-landing:<sha>
#
# Aplica deploy/k8s/adini-web.yaml (Deployment + Service + Ingress) en el
# namespace default de vm-3 y espera el rollout. Mismo esquema que los
# scripts de vm-3-iac: render local con envsubst, tar por ssh, kubectl remoto.

SSH_HOST="${1:-}"
IMAGE_REF="${2:-}"

if [[ -z "$SSH_HOST" || -z "$IMAGE_REF" ]]; then
  echo "Uso: $0 <ssh_host> <image_ref>"
  exit 1
fi

for cmd in ssh tar envsubst; do
  command -v "$cmd" >/dev/null 2>&1 || { echo "Falta comando requerido: $cmd"; exit 1; }
done

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RENDER_DIR="$(mktemp -d)"
REMOTE_DIR="/tmp/adini-web-deploy"
trap 'rm -rf "$RENDER_DIR"' EXIT

export ADINI_WEB_IMAGE="$IMAGE_REF"
envsubst '${ADINI_WEB_IMAGE}' < "$ROOT_DIR/deploy/k8s/adini-web.yaml" > "$RENDER_DIR/adini-web.yaml"

tar czf - -C "$RENDER_DIR" . | ssh "$SSH_HOST" "rm -rf $REMOTE_DIR && mkdir -p $REMOTE_DIR && tar xzf - -C $REMOTE_DIR"

echo "[1/2] Aplicando manifiestos (imagen $IMAGE_REF)"
ssh "$SSH_HOST" "kubectl apply -f $REMOTE_DIR/adini-web.yaml -n default"

echo "[2/2] Rollout status"
ssh "$SSH_HOST" "kubectl rollout status deployment/adini-web -n default --timeout=180s"

echo "Deploy de la landing completado."
