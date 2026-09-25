import { GradeDetail } from "@/components/grade-detail";

export default async function CourseGradesPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  return <GradeDetail courseId={courseId} />;
}
