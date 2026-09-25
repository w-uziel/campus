import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Assignment } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFromOffset(offset: number, time = "11:59 PM") {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return `${date.toISOString().slice(0, 10)}T${to24Hour(time)}:00`;
}

function to24Hour(time: string) {
  const [clock, period] = time.split(" ");
  const [rawHour, minute] = clock.split(":").map(Number);
  let hour = rawHour;
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export function dueDate(assignment: Assignment) {
  return new Date(dateFromOffset(assignment.dueOffset, assignment.dueTime));
}

export function dueLabel(assignment: Assignment) {
  const date = dueDate(assignment);
  if (assignment.dueOffset < 0) {
    const days = Math.abs(assignment.dueOffset);
    return `${days} day${days === 1 ? "" : "s"} overdue`;
  }
  if (assignment.dueOffset === 0) return `Today, ${assignment.dueTime}`;
  if (assignment.dueOffset === 1) return `Tomorrow, ${assignment.dueTime}`;
  return `${date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}, ${assignment.dueTime}`;
}

export function urgency(assignment: Assignment) {
  if (assignment.dueOffset < 0 && assignment.status !== "submitted" && assignment.status !== "graded") return "overdue";
  if (assignment.dueOffset === 0) return "today";
  if (assignment.dueOffset <= 7) return "week";
  return "later";
}

export function assignmentStatusLabel(status: Assignment["status"]) {
  return {
    "not-started": "Not started",
    "in-progress": "In progress",
    ready: "Ready to submit",
    submitted: "Submitted",
    graded: "Graded",
  }[status];
}
