# Deploy automático a vm-3

`.github/workflows/ci.yml` hace lo mismo que el CI de hip-monorepo, adaptado a
la landing:

| Evento | Qué corre |
|---|---|
| Pull request | `docker build` completo (build de React + prerender + nginx), sin push. |
| Push a `main` | Build y push de `ghcr.io/adini-solutions/adini-landing:<sha>`, deploy a vm-3 y smoke test. |
| `workflow_dispatch` | Build y push (el deploy sólo corre en push a `main`). |

El deploy entra a `golivieri@ssh.adini.com.ar` por Cloudflare Access
(`cloudflared access ssh` con service token) y corre `deploy/deploy-vm.sh`,
que aplica `deploy/k8s/adini-web.yaml` (Deployment y Service `adini-web`, Ingress `adini-web-ingress`
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
2. **Imagen**: el repo está en la org `adini-solutions`, así que la imagen va a
   `ghcr.io/adini-solutions/adini-landing` y el cluster la baja con el pull
   secret `ghcr-auth` que ya existe. `DEPLOY_SSH_KEY` tiene que ser la clave
   privada completa en formato OpenSSH/PEM, con las líneas `-----BEGIN` y
   `-----END` y un salto de línea al final; si no, `ssh-add` falla con
   `error in libcrypto`.
3. **Cloudflare Zero Trust**: el tunnel `cloudflared` ya manda `adini.com.ar` y
   `www.adini.com.ar` a `http://quickstart-ingress-nginx-controller:80`.

## A mano

```bash
docker build -t ghcr.io/adini-solutions/adini-landing:manual . && docker push ghcr.io/adini-solutions/adini-landing:manual
./deploy/deploy-vm.sh golivieri@ssh.adini.com.ar ghcr.io/adini-solutions/adini-landing:manual
./deploy/smoke-test-vm.sh golivieri@ssh.adini.com.ar
```

El `Dockerfile` y el `nginx.conf` son los descritos en
[despliegue-seo.md](despliegue-seo.md).
