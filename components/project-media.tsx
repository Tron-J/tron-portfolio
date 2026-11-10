import type { CSSProperties } from "react";
import "./project-media.css";

const mediaDimensions: Record<string, { width: number; height: number }> = {
  "/projects/smart-collar/assembly.webp": { width: 599, height: 681 },
  "/projects/smart-collar/enclosure.webp": { width: 550, height: 589 },
  "/projects/smart-collar/wiring.webp": { width: 1117, height: 1163 },
  "/projects/smart-collar/app-dashboard.webp": { width: 540, height: 1123 },
  "/projects/smart-collar/app-sign-in.webp": { width: 540, height: 530 },
  "/projects/smart-collar/app-alerts.webp": { width: 358, height: 243 },
  "/projects/smart-collar/field-test.webp": { width: 508, height: 677 },
};

type ProjectMediaProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  contain?: boolean;
  eager?: boolean;
  delay?: number;
};

/** Real project photography and app captures, with stable dimensions while loading. */
export function ProjectMedia({
  src,
  alt,
  caption,
  className = "",
  contain = false,
  eager = false,
  delay = 0,
}: ProjectMediaProps) {
  const dimensions = mediaDimensions[src];
  const frameStyle = dimensions
    ? { "--media-aspect": `${dimensions.width} / ${dimensions.height}` } as CSSProperties
    : undefined;

  return (
    <figure
      className={`project-media${contain ? " project-media--contain" : ""} ${className}`}
      data-reveal
      data-reveal-delay={delay}
      style={frameStyle}
    >
      <div className="project-media-frame">
        {/* Native images preserve the exported report figures without an image service. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" width={dimensions?.width} height={dimensions?.height} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
