"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { courses } from "@/lib/mock-data";
import type { AssignmentStatus } from "@/lib/types";
import { assignmentStatusLabel, dueLabel } from "@/lib/utils";
import { useDemo } from "./demo-provider";
import { AssignmentDone } from "./ui/assignment-done";
import { SketchIcon } from "./ui/sketch-icon";

export function AssignmentDetail({ assignmentId }: { assignmentId: string }) {
  const { assignments, setAssignmentStatus } = useDemo();
  const assignment = assignments.find((item) => item.id === assignmentId);
  const [response, setResponse] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  if (!assignment) return <div className="empty">Assignment not found.</div>;
  const course = courses.find((item) => item.id === assignment.courseId)!;
  function submit() { setAssignmentStatus(assignment!.id, "submitted"); setSent(true); }
  return <main className="page-shell"><Link href="/assignments" className="text-link back-link"><SketchIcon name="arrow-left" size={14} /> Back to assignments</Link><div className="page-heading"><div><p className="eyebrow">{course.name}</p><h1>{assignment.title}</h1><p className="page-subtitle">Due {dueLabel(assignment)} · {assignment.points} points</p></div><div className="assignment-detail-actions"><AssignmentDone id={assignment.id} status={assignment.status} title={assignment.title} /><span className="done-label">Mark done</span><select className={`select status-select status-${assignment.status}`} value={assignment.status} onChange={(event) => setAssignmentStatus(assignment.id, event.target.value as AssignmentStatus)}>{(["not-started", "in-progress", "ready", "submitted"] as AssignmentStatus[]).map((state) => <option key={state} value={state}>{assignmentStatusLabel(state)}</option>)}</select></div></div><div className="content-grid"><section className="content-card"><div className="content-card-header"><h2>Instructions</h2></div><div className="content-card-body"><p className="reading-copy">{assignment.description}</p><div className="announcement submission-note"><strong>Submission notes</strong><p>Attach supporting files if needed. This mock submission is not uploaded or saved after you leave this page.</p></div></div></section><aside className="content-card submission-box"><div className="content-card-header"><h2>Your submission</h2></div><div className="content-card-body">{sent ? <div className="empty"><SketchIcon name="send" size={28} /><strong>Submitted for demo</strong>This status is saved locally, but your response and attachments are not.</div> : <><textarea value={response} onChange={(event) => setResponse(event.target.value)} placeholder="Write a response…" /><input ref={input} hidden type="file" multiple onChange={(event) => setFiles(Array.from(event.target.files ?? []).map((file) => file.name))} /><button className="file-drop" onClick={() => input.current?.click()}><SketchIcon name="upload" size={22} /><span>Choose mock attachments</span></button>{files.map((file) => <div key={file} className="assignment-row attached-file"><SketchIcon name="paperclip" size={14} /><span className="assignment-title">{file}</span></div>)}<button className="button primary submit-button" disabled={!response.trim() && !files.length} onClick={submit}><SketchIcon name="send" size={14} /> Submit</button></>}</div></aside></div></main>;
}
