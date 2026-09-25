import { CalendarView } from "@/components/calendar-view";

export default async function CourseCalendarPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  return <CalendarView courseId={courseId} embedded />;
}
