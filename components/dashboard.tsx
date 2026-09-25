"use client";

import Link from "next/link";
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { assignments as seededAssignments, courses, defaultWidgets } from "@/lib/mock-data";
import type { WidgetConfig, WidgetId } from "@/lib/types";
import { dueLabel, urgency } from "@/lib/utils";
import { CourseCard } from "./course-card";
import { useDemo } from "./demo-provider";
import { Button } from "./ui/button";
import { AssignmentDone } from "./ui/assignment-done";
import { SketchIcon, type SketchIconName } from "./ui/sketch-icon";

const widgetNames: Record<WidgetId, string> = {
  notifications: "Notifications",
  courses: "Courses",
  upcoming: "Upcoming",
  grades: "Grades",
  announcements: "Announcements",
  calendar: "Mini calendar",
  progress: "Assignment progress",
};
const sizeOrder: WidgetConfig["size"][] = ["small", "medium", "large", "wide"];

export function Dashboard() {
  const { widgets, saveWidgets } = useDemo();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(widgets);
  const [picker, setPicker] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  function beginEdit() { setDraft(widgets); setEditing(true); }
  function cancelEdit() { setDraft(widgets); setEditing(false); setPicker(false); }
  function commit() { saveWidgets(draft); setEditing(false); setPicker(false); }
  function resetLayout() { setDraft(defaultWidgets); }
  function toggleWidget(id: WidgetId) { setDraft((items) => items.map((item) => item.id === id ? { ...item, visible: !item.visible } : item)); }
  function resizeWidget(id: WidgetId) { setDraft((items) => items.map((item) => item.id === id ? { ...item, size: sizeOrder[(sizeOrder.indexOf(item.size) + 1) % sizeOrder.length] } : item)); }
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setDraft((items) => {
      const from = items.findIndex((item) => item.id === active.id);
      const to = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, from, to);
    });
  }

  const visible = (editing ? draft : widgets).filter((item) => item.visible);
  return (
    <main className="page-shell">
      <div className={`dashboard-toolbar ${editing ? "editing" : ""}`}>
        <div className="actions">
          {editing ? <>
            <span className="dashboard-edit-note"><SketchIcon name="grid" size={15} /> Drag, resize, or hide widgets</span>
            <div className="picker-wrap">
              <Button onClick={() => setPicker((value) => !value)}><SketchIcon name="plus" size={15} /> Add widget</Button>
              {picker && <div className="popover widget-picker"><div className="popover-header">Widget library</div>{draft.map((item) => <button key={item.id} className="notification-item picker-item" onClick={() => toggleWidget(item.id)}><span>{widgetNames[item.id]}</span><span className="status-pill">{item.visible ? "Shown" : "Hidden"}</span></button>)}</div>}
            </div>
            <Button onClick={resetLayout}><SketchIcon name="reset" size={15} /> Default</Button>
            <Button variant="ghost" onClick={cancelEdit}><SketchIcon name="close" size={15} /> Cancel</Button>
            <Button variant="primary" onClick={commit}><SketchIcon name="save" size={15} /> Save</Button>
          </> : <button className="customize-button" onClick={beginEdit} title="Customize dashboard" aria-label="Customize dashboard"><SketchIcon name="sliders" size={17} /></button>}
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={visible.map((item) => item.id)} strategy={rectSortingStrategy}>
          <div className="dashboard-grid">
            {visible.map((config) => <SortableWidget key={config.id} config={config} editing={editing} onHide={() => toggleWidget(config.id)} onResize={() => resizeWidget(config.id)} />)}
          </div>
        </SortableContext>
      </DndContext>
    </main>
  );
}

function SortableWidget({ config, editing, onHide, onResize }: { config: WidgetConfig; editing: boolean; onHide: () => void; onResize: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: config.id, disabled: !editing });
  const grid = widgetGrid(config);
  const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 30 : undefined, opacity: isDragging ? .76 : 1, gridColumnEnd: `span ${grid.columns}`, gridRowEnd: `span ${grid.rows}` };
  const dragProps = editing ? { ...attributes, ...listeners } : {};
  return (
    <section ref={setNodeRef} style={style} data-widget={config.id} className={`widget ${config.size} ${editing ? "editing" : ""} ${isDragging ? "dragging" : ""}`} {...dragProps}>
      <WidgetControls editing={editing} onHide={onHide} onResize={onResize} />
      {config.id === "notifications" ? <NotificationStrip editing={editing} /> : <>
        <header className="widget-header"><div><div className="widget-title">{widgetIcon(config.id)}{widgetNames[config.id]}</div></div></header>
        <WidgetContent id={config.id} />
      </>}
    </section>
  );
}

function WidgetControls({ editing, onHide, onResize }: { editing: boolean; onHide: () => void; onResize: () => void }) {
  if (!editing) return null;
  return <><button className="widget-remove" onPointerDown={(event) => event.stopPropagation()} onClick={onHide} title="Hide widget"><SketchIcon name="minus" size={14} /></button><button className="widget-resize" onPointerDown={(event) => event.stopPropagation()} onClick={onResize} title="Change widget size"><SketchIcon name="resize" size={15} /></button></>;
}

function widgetGrid(config: WidgetConfig) {
  if (config.id === "notifications" && config.size === "wide") return { columns: 12, rows: 2 };
  if (config.id === "upcoming" && config.size === "medium") return { columns: 4, rows: 7 };
  if (config.id === "grades" && config.size === "medium") return { columns: 4, rows: 4 };
  return {
    small: { columns: 3, rows: 5 },
    medium: { columns: 4, rows: 5 },
    large: { columns: 8, rows: 11 },
    wide: { columns: 12, rows: 6 },
  }[config.size];
}

function widgetIcon(id: WidgetId) {
  const icon: Record<WidgetId, SketchIconName> = { notifications: "bell", courses: "book", upcoming: "gauge", grades: "chart", announcements: "megaphone", calendar: "calendar", progress: "check" };
  return <SketchIcon name={icon[id]} size={16} />;
}

function WidgetContent({ id }: { id: WidgetId }) {
  if (id === "courses") return <CoursesWidget />;
  if (id === "upcoming") return <UpcomingWidget />;
  if (id === "grades") return <GradesWidget />;
  if (id === "announcements") return <AnnouncementsWidget />;
  if (id === "calendar") return <MiniCalendarWidget />;
  if (id === "progress") return <ProgressWidget />;
  return null;
}

function NotificationStrip({ editing }: { editing: boolean }) {
  const { notifications } = useDemo();
  const unread = notifications.filter((item) => !item.read);
  const latest = unread[0] ?? notifications[0];
  const content = <><div className="unread-count"><span className="unread-number">{unread.length}</span><span><strong>Unread</strong><small>notifications</small></span></div><div className="recent-note"><strong>{latest.title}</strong><span>{latest.detail}</span></div><span className="text-link">View all <SketchIcon name="arrow-right" size={13} /></span>{unread.length > 0 && <span className="notification-alert-mark" aria-hidden="true">!</span>}</>;
  return editing ? <div className="notification-strip">{content}</div> : <Link href="/notifications" className="notification-strip notification-strip-link">{content}</Link>;
}

function CoursesWidget() {
  return <div className="widget-body"><div className="course-grid">{courses.map((course) => <CourseCard key={course.id} course={course} />)}</div></div>;
}

function UpcomingWidget() {
  const { assignments } = useDemo();
  const active = assignments.filter((item) => item.status !== "graded" && item.status !== "submitted");
  const groups = [
    { id: "overdue", label: "Overdue" },
    { id: "today", label: "Today" },
    { id: "week", label: "This week" },
    { id: "later", label: "Later" },
  ];
  return <div className="widget-body list">{groups.map((group) => {
    const items = active.filter((item) => urgency(item) === group.id).slice(0, 3);
    if (!items.length) return null;
    return <div className="list-section" key={group.id}><p className={`section-label ${group.id === "overdue" ? "overdue" : ""}`}>{group.label}</p>{items.map((item) => {
      const course = courses.find((entry) => entry.id === item.courseId)!;
      return <div key={item.id} className="assignment-row compact-assignment-row"><AssignmentDone id={item.id} status={item.status} title={item.title} compact /><Link href={`/assignments/${item.id}`}><span className="assignment-title">{item.title}</span><span className="assignment-meta">{course.name} · {dueLabel(item)}</span></Link><span className={`status-pill ${group.id === "overdue" ? "overdue" : ""}`}>{item.points} pts</span></div>;
    })}</div>;
  })}<Link href="/assignments" className="text-link list-footer-link">All assignments <SketchIcon name="arrow-right" size={13} /></Link></div>;
}

function GradesWidget() {
  return <div className="widget-body">{courses.map((course) => <Link href={`/courses/${course.id}/grades`} className="grade-row" key={course.id}><span><span className="grade-course">{course.name}</span><span className="progress-track grade-progress"><span className="progress-fill" style={{ width: `${course.grade}%` }} /></span></span><span className="grade-value">{course.grade}% <small>{course.letter}</small></span></Link>)}</div>;
}

function AnnouncementsWidget() {
  return <div className="widget-body"><div className="announcement"><strong>Lab groups posted</strong><p>Ms. Rivera added lab groups and preparation notes for Thursday.</p></div><div className="announcement"><strong>Essay workshop reminder</strong><p>Bring a printed thesis and one body paragraph to class.</p></div></div>;
}

function MiniCalendarWidget() {
  const today = new Date().getDate();
  return <div className="widget-body"><p className="widget-caption">{new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p><div className="mini-calendar">{Array.from({ length: 35 }, (_, index) => { const day = index - 2; return <span className={`mini-day ${day === today ? "today" : ""}`} key={index}>{day > 0 && day <= 31 ? day : ""}</span>; })}</div></div>;
}

function ProgressWidget() {
  const { assignments } = useDemo();
  const stats = useMemo(() => [
    { label: "Completed", value: assignments.filter((item) => item.status === "graded" || item.status === "submitted").length },
    { label: "In progress", value: assignments.filter((item) => item.status === "in-progress" || item.status === "ready").length },
    { label: "Not started", value: assignments.filter((item) => item.status === "not-started").length },
  ], [assignments]);
  return <div className="widget-body"><div className="stats-row">{stats.map((stat) => <div className="stat" key={stat.label}><span className="stat-value">{stat.value}</span><span className="stat-label">{stat.label}</span></div>)}</div><div className="widget-footnote">{seededAssignments.length} assignments in this demo</div></div>;
}
