"use client";

import { useEffect, useRef, useState } from "react";

type Effect = { id: number; kind: "underline" | "circle" | "box"; left: number; top: number; width: number; height: number };

const interactiveSelector = "button:not(:disabled):not(.assignment-check), a.button, a.icon-button";

export function HoverNoteEffects() {
  const [effect, setEffect] = useState<Effect | null>(null);
  const active = useRef<HTMLElement | null>(null);
  const sequence = useRef(0);

  useEffect(() => {
    function enter(event: PointerEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>(interactiveSelector) : null;
      if (!target || target === active.current) return;
      const rect = target.getBoundingClientRect();
      const kinds: Effect["kind"][] = ["underline", "circle", "box"];
      active.current = target;
      sequence.current += 1;
      setEffect({
        id: sequence.current,
        kind: kinds[Math.floor(Math.random() * kinds.length)],
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }

    function leave(event: PointerEvent) {
      const current = active.current;
      if (!current) return;
      if (event.relatedTarget instanceof Node && current.contains(event.relatedTarget)) return;
      if (event.target instanceof Node && !current.contains(event.target)) return;
      active.current = null;
      setEffect(null);
    }

    function clear() {
      active.current = null;
      setEffect(null);
    }

    document.addEventListener("pointerover", enter);
    document.addEventListener("pointerout", leave);
    window.addEventListener("scroll", clear, true);
    window.addEventListener("resize", clear);
    return () => {
      document.removeEventListener("pointerover", enter);
      document.removeEventListener("pointerout", leave);
      window.removeEventListener("scroll", clear, true);
      window.removeEventListener("resize", clear);
    };
  }, []);

  if (!effect) return null;

  const style = effect.kind === "underline"
    ? { left: effect.left - 5, top: effect.top + effect.height - 5, width: effect.width + 10, height: 18 }
    : { left: effect.left - 8, top: effect.top - 7, width: effect.width + 16, height: effect.height + 14 };

  return (
    <svg key={effect.id} className={`hover-note-effect hover-note-${effect.kind}`} style={style} viewBox={effect.kind === "underline" ? "0 0 120 20" : "0 0 120 60"} aria-hidden="true">
      {effect.kind === "underline" && <>
        <path d="M3 12c18-8 35 5 53-1 18-7 37 4 61-3" />
        <path className="hover-note-echo" d="M5 16c22-6 42 4 61-2 17-5 32 3 49-2" />
      </>}
      {effect.kind === "circle" && <>
        <path d="M5 33C9 6 104 0 116 26c10 24-83 39-106 17C4 38 3 31 8 24" />
        <path className="hover-note-echo" d="M9 36C20 8 104 8 112 29c7 21-80 31-99 14" />
      </>}
      {effect.kind === "box" && <>
        <path d="M7 10C32 7 82 9 114 7c3 16 1 32 2 45-31 3-79 0-110 2C4 39 7 23 7 10Z" />
        <path className="hover-note-echo" d="M10 13c27-2 72 0 101-2 1 13 0 26 2 38-32 1-72-1-104 2" />
      </>}
    </svg>
  );
}
