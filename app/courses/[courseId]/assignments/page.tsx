import { AssignmentList } from "@/components/assignment-list";

export default async function CourseAssignmentsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  return <AssignmentList courseId={courseId} compact />;
}
