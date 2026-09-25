import Link from "next/link";
import { events, materials } from "@/lib/mock-data";
import { dueLabel } from "@/lib/utils";
import { CourseUpcoming } from "@/components/course-upcoming";
import { MaterialTree } from "@/components/material-tree";
import { SketchIcon } from "@/components/ui/sketch-icon";

export default async function CourseOverviewPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const courseEvents = events.filter((item) => item.courseId === courseId);
  return <div className="content-grid course-overview-grid"><section className="content-card course-materials-card"><div className="content-card-header"><h2>Materials</h2><Link href={`/courses/${courseId}/materials`} className="text-link">View all <SketchIcon name="arrow-right" size={13} /></Link></div><MaterialTree items={materials[courseId] ?? []} /></section><aside className="stack"><section className="content-card"><div className="content-card-header"><h2>Upcoming work</h2></div><div className="content-card-body"><CourseUpcoming courseId={courseId} /></div></section><section className="content-card"><div className="content-card-header"><h2>Events</h2></div><div className="content-card-body">{courseEvents.length ? courseEvents.map((event) => <div className="assignment-row event-row" key={event.id}><SketchIcon name="calendar" size={16} /><span><span className="assignment-title">{event.title}</span><span className="assignment-meta">{dueLabel({ dueOffset: event.offset, dueTime: event.time } as Parameters<typeof dueLabel>[0])}</span></span></div>) : <p className="muted-copy">No upcoming course events.</p>}</div></section></aside></div>;
}
