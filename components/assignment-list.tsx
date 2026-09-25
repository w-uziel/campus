"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { courses } from "@/lib/mock-data";
import type { AssignmentStatus } from "@/lib/types";
import { assignmentStatusLabel, dueLabel, urgency } from "@/lib/utils";
import { useDemo } from "./demo-provider";
import { AssignmentDone } from "./ui/assignment-done";
import { SketchIcon } from "./ui/sketch-icon";

export function AssignmentList({ courseId, compact = false }: { courseId?: string; compact?: boolean }) {
  const { assignments, setAssignmentStatus } = useDemo();
  const [query, setQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(courseId ?? "all");
  const [status, setStatus] = useState("all");
  const filtered = useMemo(() => assignments.filter((item) => {
    return (selectedCourse === "all" || item.courseId === selectedCourse) &&
      (status === "all" || item.status === status) &&
      item.title.toLowerCase().includes(query.toLowerCase());
  }).sort((a, b) => a.dueOffset - b.dueOffset), [assignments, selectedCourse, status, query]);
  const groups = [
    { id: "overdue", label: "Overdue" },
    { id: "today", label: "Today" },
    { id: "week", label: "This week" },
    { id: "later", label: "Later" },
  ];
  const complete = filtered.filter((item) => item.status === "submitted" || item.status === "graded");
  return <div>{!compact && <div className="filter-bar"><label className="search-box assignment-search"><SketchIcon name="search" size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search assignments" /></label><select className="select" value={selectedCourse} onChange={(event) => setSelectedCourse(event.target.value)}><option value="all">All courses</option>{courses.map((course) => <option key={course.id} value={course.id}>{course.name}</option>)}</select><select className="select" value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All statuses</option>{(["not-started", "in-progress", "ready", "submitted", "graded"] as AssignmentStatus[]).map((item) => <option key={item} value={item}>{assignmentStatusLabel(item)}</option>)}</select></div>}
    <section className="content-card"><div className="content-card-body">{groups.map((group) => {
      const items = filtered.filter((item) => urgency(item) === group.id && item.status !== "submitted" && item.status !== "graded");
      if (!items.length) return null;
      return <div className="list-section" key={group.id}><p className={`section-label ${group.id === "overdue" ? "overdue" : ""}`}>{group.label}</p>{items.map((item) => {
        const course = courses.find((entry) => entry.id === item.courseId)!;
        return <div className="assignment-row assignment-list-row" key={item.id}><AssignmentDone id={item.id} status={item.status} title={item.title} /><Link href={`/assignments/${item.id}`}><span className="assignment-title">{item.title}</span><span className="assignment-meta">{course.name} · {dueLabel(item)} · {item.points} points</span></Link><select className={`select status-select status-${item.status}`} value={item.status} onChange={(event) => setAssignmentStatus(item.id, event.target.value as AssignmentStatus)}>{(["not-started", "in-progress", "ready", "submitted"] as AssignmentStatus[]).map((state) => <option key={state} value={state}>{assignmentStatusLabel(state)}</option>)}</select><span className={`status-pill ${group.id === "overdue" ? "overdue" : ""}`}>{group.id === "overdue" ? "Overdue" : item.type}</span></div>;
      })}</div>;
    })}{complete.length > 0 && <div className="list-section"><p className="section-label">Completed</p>{complete.map((item) => { const course = courses.find((entry) => entry.id === item.courseId)!; return <div className="assignment-row completed-assignment-row" key={item.id}><AssignmentDone id={item.id} status={item.status} title={item.title} /><Link href={`/assignments/${item.id}`}><span className="assignment-title">{item.title}</span><span className="assignment-meta">{course.name} · {assignmentStatusLabel(item.status)}</span></Link><span className="points">{item.score !== undefined ? `${item.score}/${item.points}` : `${item.points} pts`}</span></div>; })}</div>}</div></section>
  </div>;
}
