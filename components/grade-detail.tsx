"use client";

import { courses } from "@/lib/mock-data";
import { useDemo } from "./demo-provider";
import { AssignmentDone } from "./ui/assignment-done";

export function GradeDetail({ courseId }: { courseId: string }) {
  const { assignments } = useDemo();
  const course = courses.find((item) => item.id === courseId)!;
  const items = assignments.filter((item) => item.courseId === courseId);
  return <div className="content-grid"><section className="content-card"><div className="content-card-header"><h2>Gradebook</h2></div><table className="grade-table"><thead><tr><th>Done</th><th>Item</th><th>Status</th><th>Score</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><AssignmentDone id={item.id} status={item.status} title={item.title} compact /></td><td><strong>{item.title}</strong><div className="table-meta">{item.type}</div></td><td><span className="status-pill">{item.status.replaceAll("-", " ")}</span></td><td>{item.score !== undefined ? `${item.score} / ${item.points}` : `— / ${item.points}`}</td></tr>)}</tbody></table></section><aside className="content-card grade-summary-card"><div className="content-card-body"><p className="section-label">Current grade</p><div className="score-big">{course.grade}%</div><p className="muted-copy">{course.letter} · Current term</p><span className="progress-track"><span className="progress-fill" style={{ width: `${course.grade}%` }} /></span></div></aside></div>;
}
