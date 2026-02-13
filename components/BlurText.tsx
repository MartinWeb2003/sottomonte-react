"use client";

import React, { useEffect, useMemo, useState } from "react";

type Props<T extends React.ElementType = "h2"> = {
  text: string;
  className?: string;
  as?: T;
  delayPerCharMs?: number;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children">;

export default function BlurText<T extends React.ElementType = "h2">({
  text,
  className = "",
  as,
  delayPerCharMs = 18,
  ...rest
}: Props<T>) {
  const Component = (as ?? "h2") as React.ElementType;

  const chars = useMemo(() => text.split(""), [text]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <Component className={`blurtext ${className}`} aria-label={text} {...rest}>
      {chars.map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className={`blurtext-char ${ready ? "is-in" : ""}`}
          style={{ transitionDelay: `${i * delayPerCharMs}ms` }}
          aria-hidden="true"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </Component>
  );
}
