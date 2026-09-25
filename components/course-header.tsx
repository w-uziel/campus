import Link from "next/link";
import { courses } from "@/lib/mock-data";
import { CourseNav } from "./course-nav";
import { SketchIcon } from "./ui/sketch-icon";

export function CourseHeader({ courseId }: { courseId: string }) {
  const course = courses.find((item) => item.id === courseId)!;
  return <><section className="detail-header"><div><p className="course-code">{course.shortName} / course file</p><h1>{course.name}</h1><div className="detail-meta"><span>{course.teacher}</span><span>{course.room}</span><span>{course.meeting}</span></div></div><Link href={`/courses/${courseId}/grades`} className="course-header-grade"><span>Current grade</span><strong>{course.grade}%</strong><small>{course.letter}<SketchIcon name="arrow-right" size={14} /></small></Link></section><CourseNav courseId={courseId} /></>;
}
