"use client";

import { useState } from "react";
import { ArrowUpRight, Cpu, Network } from "lucide-react";

const disciplines = [
  { id: "embedded", title: "Embedded systems", subtitle: "Code that connects to the physical world.", description: "The physical side of my practice: bringing sensors, firmware, and communication together into a system with a purpose.", tags: ["Firmware", "Sensor integration", "Connected devices"], caption: "SENSE → PROCESS → CONNECT" },
  { id: "ml", title: "Machine learning", subtitle: "Finding possibility in patterns.", description: "The intelligence side of my practice: exploring how data becomes a model, how that model is evaluated, and what makes its output useful.", tags: ["Data", "Model experimentation", "Evaluation"], caption: "EXPLORE → MODEL → EVALUATE" },
];

export function PracticeLab() {
  const [active, setActive] = useState(0);
  const current = disciplines[active];
  return <div className="practice-lab" data-reveal>
    <div className="discipline-switch" role="group" aria-label="Explore engineering disciplines">{disciplines.map((item, index) => <button key={item.id} type="button" className={index === active ? "discipline-button active" : "discipline-button"} aria-pressed={index === active} aria-controls="discipline-panel" onClick={() => setActive(index)}><span>{item.title}</span><ArrowUpRight size={22} aria-hidden="true" /></button>)}</div>
    <div id="discipline-panel" className="discipline-panel" aria-live="polite">
      <div className="discipline-diagram" aria-hidden="true" data-mode={current.id}>
        <svg viewBox="0 0 440 250" fill="none"><g className="lab-grid" stroke="currentColor" strokeWidth=".6">{[30,70,110,150,190,230].map(y => <path key={y} d={`M20 ${y}H420`} />)}{[20,60,100,140,180,220,260,300,340,380,420].map(x => <path key={x} d={`M${x} 30V230`} />)}</g>
          {active === 0 ? <g className="diagram-scene" key="hardware"><g stroke="currentColor" strokeWidth="1.2"><path d="M30 65H110L150 105H180M30 185H110L150 145H180M260 105H300L340 65H410M260 145H300L340 185H410M220 25V85M220 165V225" /><rect x="180" y="85" width="80" height="80" rx="3" /><rect x="190" y="95" width="60" height="60" rx="1" />{[110,125,140].map(y => <path key={y} d={`M170 ${y}H180M260 ${y}H270`} />)}<circle cx="30" cy="65" r="5" /><circle cx="30" cy="185" r="5" /><circle cx="410" cy="65" r="5" /><circle cx="410" cy="185" r="5" /></g><path className="lab-trace" d="M30 65H110L150 105H180M260 145H300L340 185H410" stroke="currentColor" strokeWidth="3" /><text x="220" y="130" textAnchor="middle" fill="currentColor" fontSize="13" fontFamily="monospace">HW</text></g> : <g className="diagram-scene" key="network"><g stroke="currentColor" strokeWidth="1" opacity=".45">{[70,125,180].flatMap(y => [50,100,150,200].map(z => <path key={`${y}-${z}`} d={`M80 ${y}L220 ${z}`} />))}{[50,100,150,200].flatMap(y => [85,165].map(z => <path key={`${y}-${z}`} d={`M220 ${y}L360 ${z}`} />))}</g>{[70,125,180].map(y => <circle key={y} cx="80" cy={y} r="9" stroke="currentColor" fill="var(--color-diagram-surface)" />)}{[50,100,150,200].map(y => <circle key={y} cx="220" cy={y} r="10" stroke="currentColor" fill="var(--color-diagram-surface)" />)}{[85,165].map(y => <circle key={y} cx="360" cy={y} r="11" stroke="currentColor" fill="var(--color-diagram-highlight)" />)}<path className="lab-trace" d="M80 125L220 100L360 165" stroke="currentColor" strokeWidth="3" /></g>}
        </svg><span className="diagram-caption">{current.caption}</span>
      </div>
      <div className="discipline-copy" key={current.id}><span className="discipline-symbol" aria-hidden="true">{active === 0 ? <Cpu size={25} /> : <Network size={25} />}</span><h3>{current.subtitle}</h3><p>{current.description}</p><ul className="practice-tags" aria-label={`${current.title} focus areas`}>{current.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div>
    </div>
  </div>;
}
