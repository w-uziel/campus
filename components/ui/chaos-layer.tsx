"use client";

import { usePathname } from "next/navigation";

type DoodleName = "coffee" | "eyes" | "lightning" | "orbit" | "spiral" | "worm";

const notes = {
  home: ["dashboard ≠ progress", "3 unread? emotionally, 300", "look busy!!", "organized chaos →"],
  assignments: ["due 11:59 = start 11:58", "rubric? never met her", "small task (ominous)", "submit first. panic later."],
  calendar: ["free time (mythical creature)", "future me has this", "← absolutely no plans here", "time is a social construct"],
  grades: ["character development", "A for audacity", "do NOT calculate the average", "numbers with consequences →"],
  courses: ["attendance is a love language", "syllabus speedrun", "knowledge probably lives here", "pretend this is highlighted"],
  notifications: ["every ping is personal", "seen ≠ processed", "tiny red dot, huge emotional impact", "good news? statistically unlikely"],
  settings: ["danger: buttons with consequences", "have you tried turning school off?", "do not touch (touch)", "configuration station →"],
} as const;

function sectionFor(pathname: string): keyof typeof notes {
  if (pathname.startsWith("/assignments")) return "assignments";
  if (pathname.startsWith("/calendar") || pathname.includes("/calendar")) return "calendar";
  if (pathname.startsWith("/grades") || pathname.includes("/grades")) return "grades";
  if (pathname.startsWith("/courses")) return "courses";
  if (pathname.startsWith("/notifications")) return "notifications";
  if (pathname.startsWith("/settings")) return "settings";
  return "home";
}

function Doodle({ name, className }: { name: DoodleName; className: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  return (
    <svg className={`chaos-doodle ${className}`} viewBox="0 0 120 120" aria-hidden="true">
      {name === "coffee" && <>
        <path {...common} d="M28 40c3 38 8 51 33 51 22 0 28-18 30-51-22-5-43-5-63 0Z" />
        <path {...common} d="M90 49c24-4 24 28 1 28M42 30c-8-12 8-14 1-25M61 29c-7-10 9-13 2-24M30 96c25 5 50 5 69-2" />
        <path className="doodle-echo" {...common} d="M31 43c1 31 9 45 31 45 17 0 24-13 27-44" />
      </>}
      {name === "eyes" && <>
        <path {...common} d="M10 57c14-21 38-23 51 0-14 20-39 19-51 0ZM62 58c14-23 36-23 49 1-13 19-37 19-49-1Z" />
        <path {...common} d="M35 48c13 0 14 19 1 20-14 0-14-19-1-20ZM86 48c13 0 14 20 0 21-13-1-13-20 0-21Z" />
        <path className="doodle-echo" {...common} d="M16 82c22 8 56 9 82-1" />
      </>}
      {name === "lightning" && <>
        <path {...common} d="M65 5 27 66l29-3-8 51 43-68-31 4 5-45Z" />
        <path className="doodle-echo" {...common} d="m69 13-30 44 25-2-8 39" />
      </>}
      {name === "orbit" && <>
        <path {...common} d="M102 61c0 18-18 34-42 34S17 79 17 61s19-34 43-34 42 16 42 34Z" />
        <path {...common} d="M100 25c9 15-4 41-28 58s-51 18-61 4c-9-15 4-41 29-58s51-18 60-4Z" />
        <path {...common} d="M67 55c7 9-6 20-14 13-8-8 6-21 14-13ZM103 22h.2" />
        <circle cx="103" cy="22" r="5" fill="currentColor" />
      </>}
      {name === "spiral" && <>
        <path {...common} d="M65 60c-4-10-21-5-18 8 4 17 30 18 42 3 18-22 0-55-31-54C19 19 3 67 29 96c20 23 57 20 81 2" />
        <path className="doodle-echo" {...common} d="M60 59c-6 3-4 12 4 13 14 1 22-17 13-28" />
      </>}
      {name === "worm" && <>
        <path {...common} d="M8 82c12-45 25 12 39-31 12-37 24 20 38-17 6-15 14-17 27-3" />
        <path {...common} d="m98 18 14 13-18 5M20 91l-8 19M27 90l6 18" />
        <circle cx="101" cy="28" r="1.8" fill="currentColor" />
        <circle cx="108" cy="31" r="1.8" fill="currentColor" />
      </>}
    </svg>
  );
}

export function ChaosLayer() {
  const pathname = usePathname();
  const section = sectionFor(pathname);
  const copy = notes[section];

  return (
    <div className={`chaos-layer chaos-${section}`} aria-hidden="true" key={pathname}>
      <div className="ink-splat splat-a"><i /><i /><i /><i /><i /></div>
      <div className="ink-splat splat-b"><i /><i /><i /><i /></div>
      <div className="ink-splat splat-c"><i /><i /><i /></div>

      <Doodle name="orbit" className="doodle-a" />
      <Doodle name="worm" className="doodle-b" />
      <Doodle name="eyes" className="doodle-c" />
      <Doodle name="coffee" className="doodle-d" />
      <Doodle name="lightning" className="doodle-e" />
      <Doodle name="spiral" className="doodle-f" />

      <span className="margin-note note-a"><b>01</b>{copy[0]}</span>
      <span className="margin-note note-b">{copy[1]}<em>!!!</em></span>
      <span className="margin-note note-c">{copy[2]}</span>
      <span className="margin-note note-d"><b>note to self:</b>{copy[3]}</span>

      <svg className="chaos-arrow arrow-a" viewBox="0 0 180 70">
        <path d="M3 54C52 2 112 13 166 40m-15-13 16 14-23 6" />
        <path className="doodle-echo" d="M4 58c52-45 107-42 158-16" />
      </svg>
      <svg className="chaos-arrow arrow-b" viewBox="0 0 140 100">
        <path d="M12 8c5 48 39 66 109 62m-19-13 20 13-18 17" />
      </svg>
    </div>
  );
}
