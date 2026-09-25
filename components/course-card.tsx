import Link from "next/link";
import type { Course } from "@/lib/types";
import { SketchIcon } from "./ui/sketch-icon";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.id}`} className="course-card">
      <div>
        <h3 className="course-name">{course.name}</h3>
        <span className="course-teacher">{course.teacher}</span>
      </div>
      <SketchIcon className="course-arrow" name="arrow-up-right" size={20} />
    </Link>
  );
}
