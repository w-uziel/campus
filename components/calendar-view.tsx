"use client";

import { useMemo, useState } from "react";
import { courses, events } from "@/lib/mock-data";
import type { AssignmentStatus } from "@/lib/types";
import { useDemo } from "./demo-provider";
import { AssignmentDone } from "./ui/assignment-done";
import { SketchIcon } from "./ui/sketch-icon";

type CalendarItem = { id: string; title: string; courseId: string; date: Date; assignmentStatus?: AssignmentStatus };

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function CalendarView({ courseId, embedded = false }: { courseId?: string; embedded?: boolean }) {
  const { assignments } = useDemo();
  const [view, setView] = useState<"month" | "week">("month");
  const [cursor, setCursor] = useState(() => { const value = new Date(); value.setHours(12, 0, 0, 0); return value; });
  const today = useMemo(() => { const value = new Date(); value.setHours(12, 0, 0, 0); return value; }, []);
  const items = useMemo<CalendarItem[]>(() => [
    ...assignments.map((item) => ({ id: item.id, title: item.title, courseId: item.courseId, date: addDays(today, item.dueOffset), assignmentStatus: item.status })),
    ...events.map((item) => ({ id: item.id, title: item.title, courseId: item.courseId, date: addDays(today, item.offset) })),
  ].filter((item) => !courseId || item.courseId === courseId), [assignments, courseId, today]);
  const label = cursor.toLocaleDateString("en-US", view === "month" ? { month: "long", year: "numeric" } : { month: "long", day: "numeric", year: "numeric" });
  function move(direction: number) { setCursor((value) => { const next = new Date(value); if (view === "month") next.setMonth(next.getMonth() + direction); else next.setDate(next.getDate() + (7 * direction)); return next; }); }
  return <section className={embedded ? "content-card" : ""}>{embedded && <div className="content-card-header"><h2>Course calendar</h2></div>}<div className={embedded ? "content-card-body" : ""}><div className="calendar-toolbar"><div className="actions"><button aria-label="Previous period" className="icon-button" onClick={() => move(-1)}><SketchIcon name="chevron-left" size={16} /></button><button className="button ghost" onClick={() => setCursor(today)}>Today</button><button aria-label="Next period" className="icon-button" onClick={() => move(1)}><SketchIcon name="chevron-right" size={16} /></button><strong className="calendar-label">{label}</strong></div><div className="segmented"><button className={view === "month" ? "active" : ""} onClick={() => setView("month")}>Month</button><button className={view === "week" ? "active" : ""} onClick={() => setView("week")}>Week</button></div></div>{view === "month" ? <MonthGrid cursor={cursor} items={items} today={today} /> : <WeekGrid cursor={cursor} items={items} today={today} />}</div></section>;
}

function MonthGrid({ cursor, items, today }: { cursor: Date; items: CalendarItem[]; today: Date }) {
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1, 12);
  const start = addDays(first, -first.getDay());
  const days = Array.from({ length: 42 }, (_, index) => addDays(start, index));
  return <><div className="calendar-weekdays">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day}>{day}</span>)}</div><div className="month-grid">{days.map((day) => { const dayItems = items.filter((item) => sameDay(item.date, day)); return <div className={`calendar-day ${day.getMonth() !== cursor.getMonth() ? "outside" : ""}`} key={day.toISOString()}><span className={`calendar-date ${sameDay(day, today) ? "today" : ""}`}>{day.getDate()}</span>{dayItems.slice(0, 3).map((item) => { const course = courses.find((entry) => entry.id === item.courseId)!; return <span className={`calendar-event ${item.assignmentStatus ? "has-check" : ""}`} key={item.id}>{item.assignmentStatus && <AssignmentDone id={item.id} status={item.assignmentStatus} title={item.title} compact />}<span><small>{course.shortName}</small>{item.title}</span></span>; })}</div>; })}</div></>;
}

function WeekGrid({ cursor, items, today }: { cursor: Date; items: CalendarItem[]; today: Date }) {
  const start = addDays(cursor, -cursor.getDay());
  const days = Array.from({ length: 7 }, (_, index) => addDays(start, index));
  return <div className="month-grid week-grid">{days.map((day) => { const dayItems = items.filter((item) => sameDay(item.date, day)); return <div className="calendar-day" key={day.toISOString()}><span className={`calendar-date ${sameDay(day, today) ? "today" : ""}`}>{day.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>{dayItems.map((item) => { const course = courses.find((entry) => entry.id === item.courseId)!; return <span className={`calendar-event week-event ${item.assignmentStatus ? "has-check" : ""}`} key={item.id}>{item.assignmentStatus && <AssignmentDone id={item.id} status={item.assignmentStatus} title={item.title} compact />}<span><small>{course.shortName}</small>{item.title}</span></span>; })}</div>; })}</div>;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
