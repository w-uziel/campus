"use client";

import { useState } from "react";
import type { AssignmentStatus } from "@/lib/types";
import { useDemo } from "../demo-provider";

export function AssignmentDone({ id, status, title, compact = false }: { id: string; status: AssignmentStatus; title: string; compact?: boolean }) {
  const { setAssignmentStatus } = useDemo();
  const checked = status === "submitted" || status === "graded";
  const locked = status === "graded";
  const [finishing, setFinishing] = useState(false);
  const visiblyChecked = checked || finishing;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={visiblyChecked}
      aria-busy={finishing}
      aria-label={locked ? `${title} is graded and complete` : `Mark ${title} ${checked ? "not done" : "done"}`}
      className={`assignment-check ${visiblyChecked ? "checked" : ""} ${locked ? "locked" : ""} ${compact ? "compact" : ""}`}
      disabled={locked || finishing}
      title={locked ? "Graded — already complete" : checked ? "Mark as not done" : "Mark as done"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (checked) {
          setAssignmentStatus(id, "not-started");
          return;
        }

        setFinishing(true);
        window.setTimeout(() => {
          setAssignmentStatus(id, "submitted");
          setFinishing(false);
        }, 650);
      }}
    >
      <svg viewBox="0 0 30 25" aria-hidden="true">
        <path d="M3 13c4 2 6 5 9 9C16 13 21 7 28 2" />
        <path className="check-echo" d="M4 11c3 2 6 5 8 8C17 11 22 5 27 3" />
      </svg>
    </button>
  );
}
