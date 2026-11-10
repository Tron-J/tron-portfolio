"use client";

/** Abstract portfolio artwork, rather than a diagram or a live data display. */
export function SignalField() {
  const gridLines = [104, 176, 248, 320, 392, 464, 536];

  return (
    <div className="signal-field" aria-hidden="true">

      <svg
        className="signal-orb"
        viewBox="0 0 640 640"
        fill="none"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="field-grid" stroke="currentColor" strokeWidth="0.6" opacity="0.13">
          {gridLines.map((position) => (
            <g key={position}>
              <path d={`M${position} 68V572`} />
              <path d={`M68 ${position}H572`} />
            </g>
          ))}
          <path d="M68 80V68h12M560 68h12v12M572 560v12h-12M80 572H68v-12" />
          <path d="M314 68h12M320 62v12M314 572h12M320 566v12M62 320h12M68 314v12M566 320h12M572 314v12" />
        </g>

        <circle cx="320" cy="320" r="232" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2 12" opacity="0.24" />
        <circle cx="320" cy="320" r="190" fill="var(--color-background)" stroke="currentColor" strokeWidth="1.1" opacity="0.95" />

        <g stroke="currentColor" strokeWidth="0.8" opacity="0.36">
          <ellipse cx="320" cy="320" rx="43" ry="190" />
          <ellipse cx="320" cy="320" rx="99" ry="190" />
          <ellipse cx="320" cy="320" rx="151" ry="190" />
          <ellipse cx="320" cy="320" rx="190" ry="64" />
          <ellipse cx="320" cy="265" rx="182" ry="55" />
          <ellipse cx="320" cy="375" rx="182" ry="55" />
          <ellipse cx="320" cy="220" rx="160" ry="39" />
          <ellipse cx="320" cy="420" rx="160" ry="39" />
          <ellipse cx="320" cy="175" rx="112" ry="20" />
          <ellipse cx="320" cy="465" rx="112" ry="20" />
          <path d="M130 320h380M320 130v380" opacity="0.6" />
        </g>

        <g className="orbit-spin">
          <g transform="rotate(-28 320 320)" stroke="currentColor">
            <ellipse cx="320" cy="320" rx="274" ry="94" strokeWidth="1.1" opacity="0.72" />
            <ellipse cx="320" cy="320" rx="282" ry="102" strokeWidth="0.6" opacity="0.19" />
            <circle className="signal-pulse" cx="594" cy="320" r="4.5" fill="currentColor" stroke="none" />
            <circle cx="46" cy="320" r="2" fill="currentColor" stroke="none" opacity="0.75" />
          </g>
        </g>

        <g className="orbit-counter">
          <g transform="rotate(51 320 320)" stroke="currentColor">
            <ellipse cx="320" cy="320" rx="251" ry="113" strokeWidth="0.8" strokeDasharray="74 8 3 8" opacity="0.5" />
            <circle className="signal-pulse" cx="69" cy="320" r="3.5" fill="currentColor" stroke="none" />
            <circle cx="571" cy="320" r="5" strokeWidth="1" opacity="0.8" />
          </g>
        </g>

        <g stroke="currentColor" strokeWidth="1" opacity="0.8">
          <path d="M304 320h10M326 320h10M320 304v10M320 326v10" />
          <circle cx="320" cy="320" r="2.3" fill="currentColor" stroke="none" />
          <path d="M92 124h18M101 115v18M530 516h18M539 507v18" opacity="0.55" />
        </g>
      </svg>

    </div>
  );
}
