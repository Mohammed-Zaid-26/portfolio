"use client";

import { useEffect, useRef } from "react";

type Node = { ax: number; ay: number; x: number; y: number; z: number; phase: number; amp: number };

/**
 * Dense, softly blurred node mesh. Nodes sit on a jittered grid and sway gently
 * around their anchors, so the mesh keeps its shape while it moves.
 * Colours come from --hero-net / --hero-net-node so it follows the theme.
 */
export default function NetworkCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let spacing = 100;
    let nodes: Node[] = [];
    let line = "18, 120, 104";
    let node = "18, 120, 104";
    let lineAlpha = 0.5;
    let nodeAlpha = 0.6;
    let raf = 0;
    let visible = true;
    const t0 = performance.now();

    const rgb = (name: string) => getComputedStyle(canvas).getPropertyValue(name).trim().split(/\s+/).join(", ");
    const readColor = () => {
      line = rgb("--hero-net") || line;
      node = rgb("--hero-net-node") || line;
      const dark = document.documentElement.classList.contains("dark");
      lineAlpha = dark ? 0.75 : 0.4;
      nodeAlpha = dark ? 0.85 : 0.5;
    };

    const seed = () => {
      spacing = Math.max(60, width / 6);
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ax = (c - 0.5 + (r % 2) * 0.5) * spacing + (Math.random() - 0.5) * spacing * 0.7;
          const ay = (r - 0.5) * spacing * 0.9 + (Math.random() - 0.5) * spacing * 0.7;
          nodes.push({ ax, ay, x: ax, y: ay, z: 0.45 + Math.random() * 0.55, phase: Math.random() * Math.PI * 2, amp: 4 + Math.random() * 8 });
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(performance.now());
    };

    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      for (const n of nodes) {
        n.x = n.ax + Math.sin(t * 0.35 + n.phase) * n.amp;
        n.y = n.ay + Math.cos(t * 0.28 + n.phase * 1.3) * n.amp;
      }

      ctx.clearRect(0, 0, width, height);
      const maxDist = spacing * 1.45;
      const lw = Math.max(2, spacing / 22);

      ctx.lineCap = "round";
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > maxDist) continue;
          const depth = (a.z + b.z) / 2;
          ctx.strokeStyle = `rgba(${line}, ${lineAlpha * depth * Math.min(1, (maxDist - d) / (spacing * 0.25))})`;
          ctx.lineWidth = lw * depth;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const r = (spacing / 6.5) * n.z;
        ctx.fillStyle = `rgba(${node}, ${nodeAlpha * n.z})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(step);
    };
    const start = () => {
      if (reduceMotion || raf || !visible) return;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    readColor();
    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Re-read colours when the theme class on <html> changes
    const mo = new MutationObserver(() => {
      readColor();
      draw(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Pause when scrolled out of view
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    return () => {
      stop();
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
