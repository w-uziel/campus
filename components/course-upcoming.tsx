"use client";

import Link from "next/link";
import { dueLabel } from "@/lib/utils";
import { useDemo } from "./demo-provider";
import { AssignmentDone } from "./ui/assignment-done";

export function CourseUpcoming({ courseId }: { courseId: string }) {
  const { assignments } = useDemo();
  const items = assignments.filter((item) => item.courseId === courseId && item.status !== "graded").sort((a, b) => a.dueOffset - b.dueOffset).slice(0, 5);
  return <div>{items.map((item) => <div key={item.id} className="assignment-row compact-assignment-row"><AssignmentDone id={item.id} status={item.status} title={item.title} compact /><Link href={`/assignments/${item.id}`}><span className="assignment-title">{item.title}</span><span className="assignment-meta">{dueLabel(item)}</span></Link><span className="status-pill">{item.points} pts</span></div>)}</div>;
}
