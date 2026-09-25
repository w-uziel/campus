import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/mock-data";

export default function CoursesPage() {
  return <main className="page-shell"><div className="page-heading"><div><p className="eyebrow">Current term</p><h1>Courses</h1><p className="page-subtitle">Your classes, materials, and course activity.</p></div></div><div className="course-grid course-directory">{courses.map((course) => <CourseCard key={course.id} course={course} />)}</div></main>;
}
