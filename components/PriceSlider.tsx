"use client";

import { useState } from "react";

const MAX = 8_000_000;
const STEP = 50_000;

const fmt = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

function clamp(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), hi);
}

export default function PriceSlider({ initMin, initMax }: { initMin: number; initMax: number }) {
  const [lo, setLo] = useState(initMin);
  const [hi, setHi] = useState(initMax);

  return (
    <div>
      <div
        className="range"
        style={{ "--min": `${(lo / MAX) * 100}%`, "--max": `${(hi / MAX) * 100}%` } as React.CSSProperties}
      >
        <div className="range-track" aria-hidden="true" />
        <input
          type="range" min={0} max={MAX} step={STEP} value={lo}
          className="range-input" aria-label="Minimum price"
          onChange={(e) => { const v = clamp(Number(e.target.value), 0, hi); setLo(v); }}
        />
        <input
          type="range" min={0} max={MAX} step={STEP} value={hi}
          className="range-input" aria-label="Maximum price"
          onChange={(e) => { const v = clamp(Number(e.target.value), lo, MAX); setHi(v); }}
        />
      </div>
      <div className="slider-value">{fmt(lo)} / {fmt(hi)}</div>
      {/* Hidden inputs that the form submits */}
      <input type="hidden" name="min" value={lo > 0 ? String(lo) : ""} />
      <input type="hidden" name="max" value={hi < MAX ? String(hi) : ""} />
    </div>
  );
}
