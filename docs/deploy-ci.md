# Deploy automático a vm-3

`.github/workflows/ci.yml` hace lo mismo que el CI de hip-monorepo, adaptado a
la landing:

| Evento | Qué corre |
|---|---|
| Pull request | `docker build` completo (build de React + prerender + nginx), sin push. |
| Push a `main` | Build y push de `ghcr.io/fredevs/adini-landing:<sha>`, deploy a vm-3 y smoke test. |
| `workflow_dispatch` | Build y push (el deploy sólo corre en push a `main`). |

El deploy entra a `golivieri@ssh.adini.com.ar` por Cloudflare Access
(`cloudflared access ssh` con service token) y corre `deploy/deploy-vm.sh`,
que aplica `deploy/k8s/landing.yaml` (Deployment `landing`, Service y un Ingress
para `adini.com.ar` y `www.adini.com.ar`) en el namespace `default`. Cada deploy
usa el tag del commit, así que el rollout pasa solo y para volver atrás alcanza
con re-correr el workflow de un commit anterior (o `kubectl set image`).

## Setup único

1. **Secrets del repo** (Settings → Secrets and variables → Actions). Son los
   mismos valores que usa hip-monorepo:
   - `CF_ACCESS_CLIENT_ID`, `CF_ACCESS_CLIENT_SECRET`: service token de
     Cloudflare Access para `ssh.adini.com.ar`.
   - `DEPLOY_SSH_KEY`: clave privada autorizada para `golivieri` en la VM
     (la de `HIP_DEPLOY_SSH_KEY`, o una nueva sumada a `~/.ssh/authorized_keys`).
2. **Imagen accesible desde el cluster.** El paquete `adini-landing` se crea en
   la cuenta `fredevs` con el primer push. El pull secret `ghcr-auth` del cluster
   es de `adini-solutions`, así que lo más simple es hacer el paquete público
   (GitHub → Packages → adini-landing → Package settings → Change visibility):
   es un sitio público, la imagen no tiene nada secreto.
3. **Cloudflare Zero Trust**: en el tunnel `cloudflared`, Public Hostnames
   `adini.com.ar` y `www.adini.com.ar` →
   `http://quickstart-ingress-nginx-controller:80`. Hasta que no se haga esto,
   el deploy queda corriendo en el cluster pero el tráfico sigue yendo a donde
   va hoy.

## A mano

```bash
docker build -t ghcr.io/fredevs/adini-landing:manual . && docker push ghcr.io/fredevs/adini-landing:manual
./deploy/deploy-vm.sh golivieri@ssh.adini.com.ar ghcr.io/fredevs/adini-landing:manual
./deploy/smoke-test-vm.sh golivieri@ssh.adini.com.ar
```

El `Dockerfile` y el `nginx.conf` son los descritos en
[despliegue-seo.md](despliegue-seo.md).
