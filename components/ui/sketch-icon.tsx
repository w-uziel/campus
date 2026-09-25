import type { ReactNode, SVGProps } from "react";

export type SketchIconName =
  | "arrow-left"
  | "arrow-right"
  | "arrow-up-right"
  | "bell"
  | "book"
  | "calendar"
  | "chart"
  | "check"
  | "check-all"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "clipboard"
  | "close"
  | "file"
  | "folder"
  | "gauge"
  | "grid"
  | "link"
  | "megaphone"
  | "minus"
  | "page"
  | "paperclip"
  | "plus"
  | "reset"
  | "resize"
  | "save"
  | "search"
  | "send"
  | "settings"
  | "sliders"
  | "upload";

type SketchIconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: SketchIconName;
  size?: number;
  title?: string;
};

const drawings: Record<SketchIconName, ReactNode> = {
  "arrow-left": <><path d="M20 12H5" /><path d="m10 6-6 6 6 6" /></>,
  "arrow-right": <><path d="M4 12h15" /><path d="m14 6 6 6-6 6" /></>,
  "arrow-up-right": <><path d="M6 18 18 6" /><path d="M9 6h9v9" /></>,
  bell: <><path d="M6.5 9.5c0-3.5 2.2-5.7 5.5-5.7s5.5 2.2 5.5 5.7c0 4 1.8 5.2 2.3 6.3H4.2c.5-1.1 2.3-2.3 2.3-6.3Z" /><path d="M9.5 19c.7.8 1.5 1.2 2.5 1.2s1.8-.4 2.5-1.2" /></>,
  book: <><path d="M4 5.4c2.8-.8 5.4-.4 8 1.3v12c-2.6-1.7-5.2-2.1-8-1.3Z" /><path d="M20 5.4c-2.8-.8-5.4-.4-8 1.3v12c2.6-1.7 5.2-2.1 8-1.3Z" /></>,
  calendar: <><path d="M4 6h16v14H4Z" /><path d="M4 10h16M8 3v5m8-5v5" /><path d="m8 14 .2.1m3.8-.1.2.1m3.8-.1.2.1m-8 3.5.2.1m3.8-.1.2.1" /></>,
  chart: <><path d="M4 20V9m5 11V4m5 16v-7m5 7V7" /><path d="M2.5 20.2c6.4-.3 12.7-.2 19 0" /></>,
  check: <path d="m4.5 12.5 4.7 4.6L19.7 6.5" />,
  "check-all": <><path d="m3 12 4 4 8-9" /><path d="m10 14 3 3 8-9" /></>,
  "chevron-down": <path d="m5 8.5 7 7 7-7" />,
  "chevron-left": <path d="m15.5 4.5-7 7.5 7 7.5" />,
  "chevron-right": <path d="m8.5 4.5 7 7.5-7 7.5" />,
  clipboard: <><path d="M7 5H4.5v16h15V5H17" /><path d="M9 3.5h6v4H9Z" /><path d="M8 12h8m-8 4h6" /></>,
  close: <><path d="m5 5 14 14" /><path d="M19 5 5 19" /></>,
  file: <><path d="M6 3.5h8l4 4V21H6Z" /><path d="M14 3.5V8h4" /></>,
  folder: <path d="M3.5 6.5h6l2 2h9v11h-17Z" />,
  gauge: <><path d="M4 17a8.7 8.7 0 1 1 16 0" /><path d="m12 13 4-4" /><path d="M7 19h10" /></>,
  grid: <><path d="M4 4h6v6H4Zm10 0h6v6h-6ZM4 14h6v6H4Zm10 0h6v6h-6Z" /></>,
  link: <><path d="m9.5 14.5 5-5" /><path d="M8 17.8 6.2 19.6a3.4 3.4 0 0 1-4.8-4.8L5.2 11a3.4 3.4 0 0 1 4.8 0" /><path d="m16 6.2 1.8-1.8a3.4 3.4 0 1 1 4.8 4.8L18.8 13a3.4 3.4 0 0 1-4.8 0" /></>,
  megaphone: <><path d="M4 10v4h4l9 4V6L8 10Z" /><path d="m8 14 1.5 5h3" /><path d="M20 9.5c.7 1.8.7 3.2 0 5" /></>,
  minus: <path d="M5 12h14" />,
  page: <><path d="M6 3.5h12V21H6Z" /><path d="M9 8h6m-6 4h6m-6 4h4" /></>,
  paperclip: <path d="m8 12.5 6.8-6.8a3 3 0 1 1 4.2 4.2l-8.5 8.5a4.2 4.2 0 0 1-6-6L13 4" />,
  plus: <><path d="M12 4.5v15" /><path d="M4.5 12h15" /></>,
  reset: <><path d="M5.5 8.5H2.8V5.8" /><path d="M3.3 8a9 9 0 1 1-.2 7" /></>,
  resize: <><path d="m5 9 4-4M5 5h4v4" /><path d="m19 15-4 4m4 0h-4v-4" /></>,
  save: <><path d="M4 4h13l3 3v13H4Z" /><path d="M8 4v6h8V4M8 20v-6h8v6" /></>,
  search: <><path d="M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Z" /><path d="m15.5 15.5 5 5" /></>,
  send: <><path d="m3 4 18 8-18 8 3-8Z" /><path d="M6 12h15" /></>,
  settings: <><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /><path d="m12 3 .7 2.2 2 .8 2-1.1 2.2 2.2-1.1 2 .8 2 2.4.9v3.1l-2.4.9-.8 2 1.1 2-2.2 2.2-2-1.1-2 .8L12 21l-3.1-.1-.7-2.2-2-.8-2 1.1L2 16.8l1.1-2-.8-2L0 12l.1-3.1 2.2-.7.8-2-1.1-2L4.2 2l2 1.1 2-.8L9 0h3Z" transform="scale(.75) translate(4 4)" /></>,
  sliders: <><path d="M4 7h16M4 17h16" /><path d="M9 4v6m6 4v6" /></>,
  upload: <><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M4 15v5h16v-5" /></>,
};

export function SketchIcon({ name, size = 18, title, className, ...props }: SketchIconProps) {
  const drawing = drawings[name];
  return (
    <svg
      aria-hidden={title ? undefined : true}
      className={["sketch-icon", className].filter(Boolean).join(" ")}
      fill="none"
      height={size}
      role={title ? "img" : undefined}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {title && <title>{title}</title>}
      <g className="sketch-icon-echo" transform="translate(.65 .45)">{drawing}</g>
      <g>{drawing}</g>
    </svg>
  );
}
