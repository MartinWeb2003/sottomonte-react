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

  // Split into words; each word is an array of chars with their global index for delay
  const words = useMemo(() => {
    const parts = text.split(" ");
    let globalIndex = 0;
    return parts.map((word) => {
      const chars = word.split("").map((ch, localI) => ({
        ch,
        index: globalIndex + localI,
      }));
      globalIndex += word.length + 1; // +1 for the space
      return chars;
    });
  }, [text]);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <Component className={`blurtext ${className}`} aria-label={text} {...rest}>
      {words.map((wordChars, wi) => (
        <React.Fragment key={wi}>
          <span style={{ whiteSpace: "nowrap", display: "inline" }}>
            {wordChars.map(({ ch, index }) => (
              <span
                key={index}
                className={`blurtext-char ${ready ? "is-in" : ""}`}
                style={{ transitionDelay: `${index * delayPerCharMs}ms` }}
                aria-hidden="true"
              >
                {ch}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && (
            <span
              className={`blurtext-char ${ready ? "is-in" : ""}`}
              style={{ transitionDelay: `${(wordChars[wordChars.length - 1]?.index ?? 0) * delayPerCharMs}ms` }}
              aria-hidden="true"
            >
              {"\u00A0"}
            </span>
          )}
        </React.Fragment>
      ))}
    </Component>
  );
}
