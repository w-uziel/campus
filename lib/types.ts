export type AssignmentStatus =
  | "not-started"
  | "in-progress"
  | "ready"
  | "submitted"
  | "graded";

export type Course = {
  id: string;
  name: string;
  shortName: string;
  color: string;
  teacher: string;
  room: string;
  grade: number;
  letter: string;
  icon?: string;
  meeting: string;
};

export type Assignment = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueOffset: number;
  dueTime: string;
  points: number;
  score?: number;
  status: AssignmentStatus;
  type: "assignment" | "quiz" | "discussion";
};

export type CalendarEvent = {
  id: string;
  courseId: string;
  title: string;
  offset: number;
  time: string;
  type: "event" | "assignment";
};

export type Notification = {
  id: string;
  courseId: string;
  title: string;
  detail: string;
  age: string;
  read: boolean;
  kind: "grade" | "assignment" | "announcement";
};

export type Material = {
  id: string;
  title: string;
  type: "folder" | "file" | "link" | "page" | "assignment";
  children?: Material[];
};

export type WidgetId =
  | "notifications"
  | "courses"
  | "upcoming"
  | "grades"
  | "announcements"
  | "calendar"
  | "progress";

export type WidgetConfig = {
  id: WidgetId;
  visible: boolean;
  size: "small" | "medium" | "wide" | "large";
};
