import { AssignmentList } from "@/components/assignment-list";

export default function AssignmentsPage() {
  return <main className="page-shell"><div className="page-heading"><div><p className="eyebrow">Workload</p><h1>Assignments</h1><p className="page-subtitle">Everything due across your courses, ordered by urgency.</p></div></div><AssignmentList /></main>;
}
