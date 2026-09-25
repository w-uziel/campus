import { notFound } from "next/navigation";
import { courses } from "@/lib/mock-data";
import { CourseHeader } from "@/components/course-header";

export default async function CourseLayout({ children, params }: { children: React.ReactNode; params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  if (!courses.some((item) => item.id === courseId)) notFound();
  return <main className="page-shell"><CourseHeader courseId={courseId} />{children}</main>;
}
