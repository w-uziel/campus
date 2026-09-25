import { CalendarView } from "@/components/calendar-view";

export default function CalendarPage() {
  return <main className="page-shell"><div className="page-heading"><div><p className="eyebrow">Schedule</p><h1>Calendar</h1><p className="page-subtitle">Assignments and course events in one place.</p></div></div><CalendarView /></main>;
}
