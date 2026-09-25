import Link from "next/link";
import { courses } from "@/lib/mock-data";
import { SketchIcon } from "@/components/ui/sketch-icon";

export default function GradesPage() {
  return <main className="page-shell"><div className="page-heading"><div><p className="eyebrow">Current term</p><h1>Grades</h1><p className="page-subtitle">A clear view of your standing in every course.</p></div></div><div className="grade-card-grid">{courses.map((course) => <Link key={course.id} href={`/courses/${course.id}/grades`} className="content-card grade-card"><p className="course-code">{course.shortName}</p><h2>{course.name}</h2><div className="score-big">{course.grade}%</div><p className="muted-copy">{course.letter} · Current term</p><span className="progress-track"><span className="progress-fill" style={{ width: `${course.grade}%` }} /></span><span className="text-link grade-card-link">View gradebook <SketchIcon name="arrow-right" size={13} /></span></Link>)}</div></main>;
}
