// El widget de Turnstile es ESM puro y carga un script de Cloudflare: en los
// tests se reemplaza por un stub que resuelve el captcha al instante.
import { useEffect } from "react";

export function Turnstile({ onSuccess }) {
  useEffect(() => {
    onSuccess?.("test-token");
  }, [onSuccess]);

  return null;
}

export default Turnstile;
