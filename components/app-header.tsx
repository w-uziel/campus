"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { courses, student } from "@/lib/mock-data";
import { CampusMark } from "./campus-mark";
import { useDemo } from "./demo-provider";
import { NotificationList } from "./notification-list";
import { SketchIcon, type SketchIconName } from "./ui/sketch-icon";

const links: { href: string; label: string; icon: SketchIconName }[] = [
  { href: "/assignments", label: "Assignments", icon: "clipboard" },
  { href: "/calendar", label: "Calendar", icon: "calendar" },
  { href: "/grades", label: "Grades", icon: "chart" },
];
const courseById = new Map(courses.map((course) => [course.id, course]));

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { assignments, notifications, markNotificationRead } = useDemo();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const notificationsRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);
  const courseCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unread = notifications.filter((item) => !item.read).length;
  const normalizedQuery = query.trim().toLowerCase();
  const searchResults = useMemo(() => normalizedQuery.length < 2 ? [] : [
    ...courses.filter((course) => `${course.name} ${course.shortName} ${course.teacher}`.toLowerCase().includes(normalizedQuery)).map((course) => ({ id: `course-${course.id}`, href: `/courses/${course.id}`, title: course.name, detail: `${course.shortName} · ${course.teacher}`, kind: "Course" })),
    ...assignments.filter((assignment) => `${assignment.title} ${assignment.description} ${courseById.get(assignment.courseId)?.name ?? ""}`.toLowerCase().includes(normalizedQuery)).map((assignment) => ({ id: `assignment-${assignment.id}`, href: `/assignments/${assignment.id}`, title: assignment.title, detail: courseById.get(assignment.courseId)?.name ?? "Assignment", kind: "Assignment" })),
  ].slice(0, 8), [assignments, normalizedQuery]);

  function openCourses() {
    if (courseCloseTimer.current) clearTimeout(courseCloseTimer.current);
    setCoursesOpen(true);
  }

  function closeCoursesSoon() {
    courseCloseTimer.current = setTimeout(() => setCoursesOpen(false), 120);
  }

  useEffect(() => {
    function close(event: MouseEvent) {
      const target = event.target as Node;
      if (notificationsRef.current && !notificationsRef.current.contains(target)) setNotificationsOpen(false);
      if (coursesRef.current && !coursesRef.current.contains(target)) setCoursesOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      if (courseCloseTimer.current) clearTimeout(courseCloseTimer.current);
    };
  }, []);

  return (
    <header className="app-header">
      <Link href="/" className="brand" aria-label="Campus home">
        <CampusMark className="brand-mark" />
        <span className="brand-copy"><strong>Campus</strong></span>
      </Link>
      <nav className="primary-nav">
        <div className="nav-dropdown" ref={coursesRef} onMouseEnter={openCourses} onMouseLeave={closeCoursesSoon} onFocus={openCourses}>
          <button aria-expanded={coursesOpen} className={`nav-link nav-button ${pathname.startsWith("/courses") ? "active" : ""}`} onClick={openCourses}>
            <SketchIcon name="book" size={15} />Courses<SketchIcon name="chevron-down" size={12} className={coursesOpen ? "chevron-open" : ""} />
          </button>
          {coursesOpen && <div className="course-menu">
            <Link href="/courses" className="course-menu-all" onClick={() => setCoursesOpen(false)}>All courses</Link>
            {courses.map((course) => <Link key={course.id} href={`/courses/${course.id}`} className="course-menu-item" onClick={() => setCoursesOpen(false)}>
              <span className="course-menu-code">{course.shortName}</span>
              <span><strong>{course.name}</strong><small>{course.teacher}</small></span>
            </Link>)}
          </div>}
        </div>
        {links.map(({ href, label, icon }) => {
          const active = pathname.startsWith(href);
          return <Link key={href} href={href} className={`nav-link ${active ? "active" : ""}`}><SketchIcon name={icon} size={15} />{label}</Link>;
        })}
      </nav>
      <div className="header-tools">
        <div className="global-search" onFocus={() => setSearchOpen(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setSearchOpen(false); }}>
          <label className="search-box"><SketchIcon name="search" size={14} /><input value={query} onChange={(event) => { setQuery(event.target.value); setSearchOpen(true); }} onKeyDown={(event) => { if (event.key === "Escape") setSearchOpen(false); if (event.key === "Enter" && searchResults[0]) { event.preventDefault(); router.push(searchResults[0].href); setQuery(""); setSearchOpen(false); } }} placeholder="Search Campus" aria-label="Search courses and assignments" role="combobox" aria-expanded={searchOpen && normalizedQuery.length >= 2} aria-controls="campus-search-results" autoComplete="off" /></label>
          {searchOpen && normalizedQuery.length >= 2 && <div className="search-results popover" id="campus-search-results" role="listbox">
            <div className="search-results-heading">Search notes <span>{searchResults.length || "No"} match{searchResults.length === 1 ? "" : "es"}</span></div>
            {searchResults.map((result) => <Link key={result.id} href={result.href} role="option" aria-selected="false" className="search-result" onClick={() => { setQuery(""); setSearchOpen(false); }}><span className="search-result-kind">{result.kind}</span><span><strong>{result.title}</strong><small>{result.detail}</small></span><SketchIcon name="arrow-up-right" size={14} /></Link>)}
            {!searchResults.length && <div className="search-empty">Nothing in these notes. Try another word?</div>}
          </div>}
        </div>
        <div className="notification-trigger" ref={notificationsRef}>
          <button aria-expanded={notificationsOpen} className="icon-button" onClick={() => setNotificationsOpen((value) => !value)} aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}><SketchIcon name="bell" size={17} />{unread > 0 && <span className="unread-dot">{unread > 9 ? "9+" : unread}</span>}</button>
          {notificationsOpen && <div className="popover"><div className="popover-header"><span>Notifications</span><Link href="/notifications" onClick={() => setNotificationsOpen(false)} className="text-link">View all</Link></div><NotificationList items={notifications.slice(0, 4)} onRead={markNotificationRead} /></div>}
        </div>
        <Link href="/settings" className={`icon-button ${pathname === "/settings" ? "active" : ""}`} aria-label="Settings"><SketchIcon name="settings" size={17} /></Link>
        <button className="avatar" title={student.name}>{student.initials}</button>
      </div>
    </header>
  );
}
