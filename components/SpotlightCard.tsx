"use client";

import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SpotlightCard({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--sx", `${x}px`);
    el.style.setProperty("--sy", `${y}px`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;

    // Move spotlight away when leaving so it fades nicely
    el.style.setProperty("--sx", `-999px`);
    el.style.setProperty("--sy", `-999px`);
  };

  return (
    <div
      ref={ref}
      className={`spotcard ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
