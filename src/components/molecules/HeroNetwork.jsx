import { useEffect, useRef } from "react";

// Fondo animado del banner: una red de nodos que se conectan por cercanía,
// con paquetes de datos que viajan entre ellos. Algunos nodos son "hubs"
// (más grandes y con halo), como servicios o regiones de nube. El cursor
// también se conecta a los nodos que tiene cerca.
// Con "reducir movimiento" activado se dibuja un único cuadro quieto.

const hexToRgb = (hex) => {
    const n = parseInt(hex.replace("#", ""), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const rgba = ([r, g, b], a) => `rgba(${r},${g},${b},${a})`;

export default function HeroNetwork({ primary = "#6c63ff", secondary = "#22d3ee" }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const c1 = hexToRgb(primary);
        const c2 = hexToRgb(secondary);
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let width = 0;
        let height = 0;
        let nodes = [];
        let packets = [];
        let frame = null;
        let visible = true;
        const mouse = { x: -9999, y: -9999 };

        const linkDistance = () => (width < 768 ? 110 : 150);

        const createNodes = () => {
            const count = Math.min(120, Math.round((width * height) / (width < 768 ? 16000 : 13000)));
            nodes = Array.from({ length: count }, (_, i) => {
                const hub = i % 11 === 0;
                return {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.25,
                    vy: (Math.random() - 0.5) * 0.25,
                    r: hub ? 2.6 + Math.random() * 1.2 : 1 + Math.random() * 1.2,
                    hub,
                    phase: Math.random() * Math.PI * 2,
                    color: Math.random() < 0.65 ? c1 : c2,
                };
            });
            packets = [];
        };

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            createNodes();
            if (reduceMotion) draw(0);
        };

        // Lanza un paquete desde un nodo hacia un vecino al azar.
        const spawnPacket = () => {
            const from = nodes[Math.floor(Math.random() * nodes.length)];
            const max = linkDistance();
            const neighbors = nodes.filter((n) => n !== from && Math.hypot(n.x - from.x, n.y - from.y) < max);
            if (!neighbors.length) return;
            const to = neighbors[Math.floor(Math.random() * neighbors.length)];
            packets.push({ from, to, t: 0, speed: 0.008 + Math.random() * 0.012, color: Math.random() < 0.5 ? c2 : c1 });
        };

        const draw = (time) => {
            ctx.clearRect(0, 0, width, height);
            const max = linkDistance();

            if (!reduceMotion) {
                for (const n of nodes) {
                    n.x += n.vx;
                    n.y += n.vy;
                    if (n.x < -20) n.x = width + 20;
                    if (n.x > width + 20) n.x = -20;
                    if (n.y < -20) n.y = height + 20;
                    if (n.y > height + 20) n.y = -20;

                    // El cursor empuja apenas a los nodos cercanos.
                    const dx = n.x - mouse.x;
                    const dy = n.y - mouse.y;
                    const d = Math.hypot(dx, dy);
                    if (d < 120 && d > 0) {
                        n.x += (dx / d) * 0.6;
                        n.y += (dy / d) * 0.6;
                    }
                }
            }

            ctx.lineWidth = 1;
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j];
                    const d = Math.hypot(a.x - b.x, a.y - b.y);
                    if (d < max) {
                        const alpha = (1 - d / max) * (a.hub || b.hub ? 0.45 : 0.26);
                        ctx.strokeStyle = rgba(a.color, alpha);
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }

                const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
                if (md < 180) {
                    ctx.strokeStyle = rgba(c2, (1 - md / 180) * 0.45);
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }

            for (const n of nodes) {
                const pulse = reduceMotion ? 1 : 0.75 + 0.25 * Math.sin(time / 900 + n.phase);
                if (n.hub) {
                    const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 7);
                    glow.addColorStop(0, rgba(n.color, 0.45 * pulse));
                    glow.addColorStop(1, rgba(n.color, 0));
                    ctx.fillStyle = glow;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, n.r * 7, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.fillStyle = rgba(n.hub ? [255, 255, 255] : n.color, n.hub ? 0.95 : 0.7 * pulse);
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fill();
            }

            if (!reduceMotion) {
                if (packets.length < Math.max(6, nodes.length / 6) && Math.random() < 0.15) spawnPacket();

                packets = packets.filter((p) => {
                    p.t += p.speed;
                    const d = Math.hypot(p.to.x - p.from.x, p.to.y - p.from.y);
                    if (p.t >= 1 || d > max * 1.3) return false;

                    const x = p.from.x + (p.to.x - p.from.x) * p.t;
                    const y = p.from.y + (p.to.y - p.from.y) * p.t;
                    const tx = p.from.x + (p.to.x - p.from.x) * Math.max(0, p.t - 0.15);
                    const ty = p.from.y + (p.to.y - p.from.y) * Math.max(0, p.t - 0.15);

                    const trail = ctx.createLinearGradient(tx, ty, x, y);
                    trail.addColorStop(0, rgba(p.color, 0));
                    trail.addColorStop(1, rgba(p.color, 0.9));
                    ctx.strokeStyle = trail;
                    ctx.lineWidth = 1.6;
                    ctx.beginPath();
                    ctx.moveTo(tx, ty);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                    ctx.lineWidth = 1;

                    ctx.fillStyle = rgba([255, 255, 255], 0.95);
                    ctx.beginPath();
                    ctx.arc(x, y, 1.6, 0, Math.PI * 2);
                    ctx.fill();
                    return true;
                });
            }
        };

        const loop = (time) => {
            if (visible) draw(time);
            frame = requestAnimationFrame(loop);
        };

        const onMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        const onMouseLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };

        // El canvas queda debajo del contenido, así que el mouse se escucha
        // en el contenedor del banner.
        const host = canvas.parentElement;
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);
        const intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
        });
        intersectionObserver.observe(canvas);

        resize();
        if (!reduceMotion) {
            host.addEventListener("mousemove", onMouseMove);
            host.addEventListener("mouseleave", onMouseLeave);
            frame = requestAnimationFrame(loop);
        }

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            host.removeEventListener("mousemove", onMouseMove);
            host.removeEventListener("mouseleave", onMouseLeave);
        };
    }, [primary, secondary]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        />
    );
}
