"use client";

import Image from "next/image";
import { useState } from "react";
import "./engineering-scene.css";

// Coordinates are traced against the 1536 × 1024 generated artwork. All layers
// share that coordinate system; the raster is never perspective-transformed.
const connections = [
  { route: "M398 455 486 435 552 477 607 465", x: 398, y: 455, delay: "1.5s" },
  { route: "M749 259 775 295 810 308 833 350", x: 749, y: 259, delay: "2.2s" },
  { route: "M494 657 579 638 617 594 656 586", x: 494, y: 657, delay: "2.9s" },
];

/** Generated concept artwork, not a photograph of the animal-health prototype. */
export function EngineeringScene() {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className="engineering-scene signal-field" data-ready={loaded || undefined}>
      <div className="hero-scene-stage">
        <div className="hero-scene-float">
        <div className="hero-scene-settle">
          <Image
            className="hero-scene-art"
            src="/brand/embedded-scene.webp"
            alt="Generated concept render of an ivory circuit board with three sensor connectors and a dimensional, bronze-pinned processor."
            width={1536}
            height={1024}
            sizes="(max-width: 760px) 100vw, 540px"
            priority
            unoptimized
            onLoad={() => setLoaded(true)}
          />
          <svg className="hero-scene-overlay" viewBox="0 0 1536 1024" fill="none" aria-hidden="true" focusable="false">
            {connections.map(({ route, x, y, delay }) => (
              <g className="hero-connection" key={route} style={{ animationDelay: delay }}>
                <circle className="hero-port-aura" cx={x} cy={y} r="19" />
                <circle className="hero-port-light" cx={x} cy={y} r="6" />
                <path className="hero-signal hero-signal-bloom" d={route} pathLength="100" />
                <path className="hero-signal hero-signal-core" d={route} pathLength="100" />
              </g>
            ))}
            <path className="hero-processor-response" d="M664 409Q658 407 662 419L755 625Q760 637 772 634L1072 562Q1082 560 1077 549L969 353Q964 344 954 347Z" />
            <path className="hero-processor-edge" d="m685 413 269-65q9-2 14 7l106 192" />
          </svg>
        </div>
        </div>
      </div>
    </figure>
  );
}
