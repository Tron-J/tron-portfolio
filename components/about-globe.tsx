"use client";

import { useEffect, useRef } from "react";
import "./about-globe.css";

type Point = { x: number; y: number; z: number };
type Face = [number, number, number];
type Segment = { a: Point; b: Point; depth: number };
const unit = ({ x, y, z }: Point): Point => {
  const length = Math.hypot(x, y, z);
  return { x: x / length, y: y / length, z: z / length };
};
const phi = (1 + Math.sqrt(5)) / 2;
const vertices = [
  [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
  [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
  [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
].map(([x, y, z]) => unit({ x, y, z }));
const faces: Face[] = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];
const shellVertices = [...vertices];
const midpointCache = new Map<string, number>();
function midpoint(a: number, b: number) {
  const key = [Math.min(a, b), Math.max(a, b)].join(":");
  const cached = midpointCache.get(key);
  if (cached !== undefined) return cached;
  const first = shellVertices[a], second = shellVertices[b];
  const index = shellVertices.push(unit({ x: first.x + second.x, y: first.y + second.y, z: first.z + second.z })) - 1;
  midpointCache.set(key, index);
  return index;
}
const shellFaces: Face[] = faces.flatMap(([a, b, c]) => {
  const ab = midpoint(a, b), bc = midpoint(b, c), ca = midpoint(c, a);
  return [[a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]] as Face[];
});
const edgeKeys = new Set<string>();
const edges: [number, number][] = [];
for (const [a, b, c] of shellFaces) {
  for (const [first, second] of [[a, b], [b, c], [c, a]]) {
    const key = [Math.min(first, second), Math.max(first, second)].join(":");
    if (!edgeKeys.has(key)) { edgeKeys.add(key); edges.push([first, second]); }
  }
}
const initialRotation = .58;
const light = unit({ x: -.65, y: .8, z: 1.2 });
function transform(point: Point, rotation: number, scale = 1): Point {
  const x = point.x * Math.cos(rotation) + point.z * Math.sin(rotation);
  const originalZ = point.z * Math.cos(rotation) - point.x * Math.sin(rotation);
  const y = point.y * Math.cos(.18) - originalZ * Math.sin(.18);
  const z = point.y * Math.sin(.18) + originalZ * Math.cos(.18);
  return { x: (x * Math.cos(-.27) - y * Math.sin(-.27)) * scale, y: (x * Math.sin(-.27) + y * Math.cos(-.27)) * scale, z: z * scale };
}
function faceColour(points: Point[]) {
  const [a, b, c] = points;
  const ab = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
  const ac = { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z };
  const normal = unit({ x: ab.y * ac.z - ab.z * ac.y, y: ab.z * ac.x - ab.x * ac.z, z: ab.x * ac.y - ab.y * ac.x });
  // Lighting stays in world space: no pulsing highlights or moving light sources.
  const amount = .13 + Math.max(0, normal.x * light.x + normal.y * light.y + normal.z * light.z) * .87;
  const shadow = [76, 47, 31], highlight = [199, 151, 103];
  return "rgb(" + shadow.map((channel, index) => Math.round(channel + (highlight[index] - channel) * amount)).join(",") + ")";
}
function orbitPoint(angle: number, orientation: number, flattening: number, radius: number): Point {
  const x = Math.cos(angle) * radius, y = Math.sin(angle) * flattening * radius;
  return { x: x * Math.cos(orientation) - y * Math.sin(orientation), y: x * Math.sin(orientation) + y * Math.cos(orientation), z: Math.sin(angle) * Math.sqrt(1 - flattening * flattening) * radius };
}
const orbits = [
  { orientation: -.38, flattening: .34, radius: 1.17, colour: "#9b6b45" },
  { orientation: .9, flattening: .25, radius: 1.1, colour: "#a98564" },
].map((orbit) => ({ ...orbit, segments: Array.from({ length: 128 }, (_, index) => {
  const a = orbitPoint(index / 128 * Math.PI * 2, orbit.orientation, orbit.flattening, orbit.radius);
  const b = orbitPoint((index + 1) / 128 * Math.PI * 2, orbit.orientation, orbit.flattening, orbit.radius);
  return { a, b, depth: (a.z + b.z) / 2 };
}) }));
const nodes = [
  { point: orbitPoint(.75, -.38, .34, 1.17), radius: 3.4 },
  { point: orbitPoint(3.65, -.38, .34, 1.17), radius: 2.7 },
  { point: orbitPoint(2.55, .9, .25, 1.1), radius: 2.3 },
];
function scene(rotation: number) {
  const shell = shellVertices.map((point) => transform(point, rotation));
  const core = vertices.map((point) => transform(point, rotation, .75));
  return {
    edges: edges.map(([a, b]) => ({ a: shell[a], b: shell[b], depth: (shell[a].z + shell[b].z) / 2 })),
    facets: faces.map((face) => {
      const points = face.map((index) => core[index]);
      return { points, depth: points.reduce((sum, point) => sum + point.z, 0) / 3, colour: faceColour(points) };
    }).sort((a, b) => a.depth - b.depth),
  };
}
const staticScene = scene(initialRotation);
const staticPosition = (point: Point) => (180 + point.x * 139).toFixed(2) + "," + (180 - point.y * 139).toFixed(2);
const staticSegment = ({ a, b }: Segment) => "M" + staticPosition(a) + "L" + staticPosition(b);

function StaticOrb() {
  return (
    <svg className="about-globe-fallback" viewBox="0 0 360 360" fill="none" aria-hidden="true">
      {orbits.map((orbit, index) => <path key={"back-orbit-" + index} d={orbit.segments.filter(({ depth }) => depth < 0).map(staticSegment).join("")} stroke={orbit.colour} opacity=".3" strokeWidth="1" />)}
      <path d={staticScene.edges.filter(({ depth }) => depth < 0).map(staticSegment).join("")} stroke="#987350" opacity=".27" strokeWidth=".75" />
      {nodes.filter(({ point }) => point.z < 0).map(({ point, radius }, index) => <circle key={"back-node-" + index} cx={(180 + point.x * 139).toFixed(2)} cy={(180 - point.y * 139).toFixed(2)} r={radius} fill="#ae835e" />)}
      {staticScene.facets.map(({ points, colour }, index) => <polygon key={index} points={points.map(staticPosition).join(" ")} fill={colour} stroke={colour} strokeWidth=".6" />)}
      <path d={staticScene.edges.filter(({ depth }) => depth >= 0).map(staticSegment).join("")} stroke="#8f6547" opacity=".7" strokeWidth=".85" />
      {orbits.map((orbit, index) => <path key={"front-orbit-" + index} d={orbit.segments.filter(({ depth }) => depth >= 0).map(staticSegment).join("")} stroke={orbit.colour} opacity={index === 0 ? .78 : .52} strokeWidth="1.05" />)}
      {nodes.filter(({ point }) => point.z >= 0).map(({ point, radius }, index) => <circle key={"front-node-" + index} cx={(180 + point.x * 139).toFixed(2)} cy={(180 - point.y * 139).toFixed(2)} r={radius} fill="#76523b" stroke="#f7f3ed" strokeWidth="1.2" />)}
    </svg>
  );
}

/** Decorative faceted bronze core, geodesic shell, and two quiet orbital arcs. */
export function AboutGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const container = containerRef.current, canvas = canvasRef.current;
    if (!container || !canvas) return;
    let context: CanvasRenderingContext2D | null = null;
    try { context = canvas.getContext("2d", { alpha: true }); } catch { return; }
    if (!context) return;
    const drawing = context;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let size = 0, rotation = initialRotation, frameId = 0, lastPaint = 0, frame = 0;
    let previousTime: number | null = null;
    let disposed = false, failed = false, inView = false;
    const paint = () => {
      if (disposed || failed || size <= 0) return;
      try {
        const centre = size / 2, radius = size * 139 / 360;
        const position = (point: Point) => ({ x: centre + point.x * radius, y: centre - point.y * radius });
        const current = scene(rotation);
        drawing.clearRect(0, 0, size, size);
        drawing.lineCap = "round"; drawing.lineJoin = "round";
        const strokes = (segments: Segment[], colour: string, opacity: number, width: number) => {
          drawing.strokeStyle = colour; drawing.globalAlpha = opacity; drawing.lineWidth = width * size / 360;
          drawing.beginPath();
          for (const { a, b } of segments) {
            const first = position(a), second = position(b);
            drawing.moveTo(first.x, first.y); drawing.lineTo(second.x, second.y);
          }
          drawing.stroke();
        };
        const drawNodes = (front: boolean) => {
          drawing.globalAlpha = 1;
          for (const { point, radius: nodeRadius } of nodes) {
            if ((point.z >= 0) !== front) continue;
            const at = position(point);
            drawing.beginPath(); drawing.arc(at.x, at.y, nodeRadius * size / 360, 0, Math.PI * 2);
            drawing.fillStyle = front ? "#76523b" : "#ae835e"; drawing.fill();
            if (front) { drawing.lineWidth = 1.2 * size / 360; drawing.strokeStyle = "#f7f3ed"; drawing.stroke(); }
          }
        };
        orbits.forEach((orbit) => strokes(orbit.segments.filter(({ depth }) => depth < 0), orbit.colour, .3, 1));
        strokes(current.edges.filter(({ depth }) => depth < 0), "#987350", .27, .75);
        drawNodes(false);
        drawing.globalAlpha = 1;
        for (const { points, colour } of current.facets) {
          drawing.beginPath();
          points.forEach((point, index) => {
            const at = position(point);
            if (index === 0) drawing.moveTo(at.x, at.y); else drawing.lineTo(at.x, at.y);
          });
          drawing.closePath(); drawing.fillStyle = colour; drawing.strokeStyle = colour; drawing.lineWidth = .6 * size / 360;
          drawing.fill(); drawing.stroke();
        }
        strokes(current.edges.filter(({ depth }) => depth >= 0), "#8f6547", .7, .85);
        orbits.forEach((orbit, index) => strokes(orbit.segments.filter(({ depth }) => depth >= 0), orbit.colour, index === 0 ? .78 : .52, 1.05));
        drawNodes(true); drawing.globalAlpha = 1;
        frame += 1;
        container.dataset.frame = String(frame);
        container.dataset.rotation = rotation.toFixed(5);
        // Do not conceal the server-rendered fallback until a whole frame is ready.
        container.dataset.canvasReady = "true";
      } catch {
        failed = true;
        container.dataset.canvasReady = "false";
        container.dataset.renderState = "fallback";
      }
    };
    const reason = () => {
      if (failed) return "fallback";
      if (preference.matches) return "reduced-motion";
      if (document.hidden || document.body.classList.contains("tab-inactive")) return "inactive";
      if (document.body.classList.contains("motion-paused")) return "paused";
      if (!inView) return "offscreen";
      return null;
    };
    const stop = () => { window.cancelAnimationFrame(frameId); frameId = 0; previousTime = null; lastPaint = 0; };
    const tick = (time: number) => {
      frameId = 0;
      if (disposed) return;
      const pauseReason = reason();
      if (pauseReason) { container.dataset.renderState = pauseReason; previousTime = null; return; }
      // Constant single-axis rotation with fixed tilt, about 97 seconds per turn.
      if (previousTime !== null) rotation = (rotation + Math.min(time - previousTime, 64) * .000065) % (Math.PI * 2);
      previousTime = time;
      const interval = 1000 / 30, elapsed = time - lastPaint;
      if (elapsed >= interval) { paint(); lastPaint = time - elapsed % interval; }
      if (!failed) frameId = window.requestAnimationFrame(tick);
    };
    const sync = () => {
      if (disposed) return;
      const pauseReason = reason();
      container.dataset.renderState = pauseReason ?? "running";
      if (pauseReason) stop(); else if (!frameId) frameId = window.requestAnimationFrame(tick);
    };
    const resize = () => {
      if (disposed || failed) return;
      size = Math.max(1, container.getBoundingClientRect().width);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(size * dpr); canvas.height = Math.round(size * dpr);
      drawing.setTransform(dpr, 0, 0, dpr, 0, 0); paint();
    };
    const bounds = () => {
      const box = container.getBoundingClientRect();
      inView = box.bottom > 0 && box.top < window.innerHeight && box.right > 0 && box.left < window.innerWidth;
      sync();
    };
    const visibility = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
      inView = entries.some((entry) => entry.isIntersecting); sync();
    }, { threshold: 0 });
    const sizing = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    const body = typeof MutationObserver === "undefined" ? null : new MutationObserver(sync);
    const windowResize = () => { resize(); if (!visibility) bounds(); };
    visibility?.observe(container); sizing?.observe(container);
    body?.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    preference.addEventListener("change", sync); document.addEventListener("visibilitychange", sync);
    window.addEventListener("resize", windowResize, { passive: true });
    if (!visibility) window.addEventListener("scroll", bounds, { passive: true });
    resize(); bounds();
    return () => {
      disposed = true; stop(); visibility?.disconnect(); sizing?.disconnect(); body?.disconnect();
      preference.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", windowResize);
      if (!visibility) window.removeEventListener("scroll", bounds);
    };
  }, []);
  return (
    <div ref={containerRef} className="about-globe" role="img"
      aria-label="A dimensional bronze orb with a faceted core, geometric wire shell and two fine orbital arcs."
      data-render-state="static" data-frame="0" data-rotation={String(initialRotation)}>
      <StaticOrb />
      <canvas ref={canvasRef} className="about-globe-canvas" aria-hidden="true" />
    </div>
  );
}
