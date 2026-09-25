"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function CourseNav({ courseId }: { courseId: string }) {
  const pathname = usePathname();
  const base = `/courses/${courseId}`;
  const links = [
    { href: base, label: "Overview" },
    { href: `${base}/materials`, label: "Materials" },
    { href: `${base}/assignments`, label: "Assignments" },
    { href: `${base}/calendar`, label: "Calendar" },
    { href: `${base}/grades`, label: "Grades" },
  ];
  return <nav className="course-nav">{links.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href ? "active" : ""}>{link.label}</Link>)}</nav>;
}
