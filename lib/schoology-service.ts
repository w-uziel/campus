import type { Assignment, AssignmentStatus, CalendarEvent, Course, Material, Notification } from "./types";

export interface SchoologyService {
  getCourses(): Promise<Course[]>;
  getAssignments(): Promise<Assignment[]>;
  updateAssignmentStatus(id: string, status: AssignmentStatus): Promise<void>;
  getCalendarEvents(): Promise<CalendarEvent[]>;
  getMaterials(courseId: string): Promise<Material[]>;
  getNotifications(): Promise<Notification[]>;
  markNotificationRead(id: string): Promise<void>;
}

// The current UI uses the local demo provider. A live adapter can implement this
// contract later without changing route or component data shapes.
