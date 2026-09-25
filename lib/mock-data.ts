import type { Assignment, CalendarEvent, Course, Material, Notification, WidgetConfig } from "./types";

export const student = { name: "Alex Morgan", initials: "AM", school: "Riverside High School" };

export const courses: Course[] = [
  { id: "ap-biology", name: "AP Biology", shortName: "BIO", color: "#9CB58B", teacher: "Ms. Rivera", room: "B214", grade: 94, letter: "A", meeting: "Period 1 · 8:10 AM" },
  { id: "us-history", name: "U.S. History", shortName: "HIS", color: "#C69078", teacher: "Mr. Thompson", room: "C108", grade: 88, letter: "B+", meeting: "Period 2 · 9:05 AM" },
  { id: "precalculus", name: "Precalculus", shortName: "MAT", color: "#7D9FB8", teacher: "Dr. Shah", room: "A302", grade: 91, letter: "A-", meeting: "Period 4 · 11:20 AM" },
  { id: "english-11", name: "English 11", shortName: "ELA", color: "#AE8EBA", teacher: "Ms. Greene", room: "D201", grade: 93, letter: "A", meeting: "Period 6 · 1:45 PM" },
];

export const assignments: Assignment[] = [
  { id: "cell-lab", courseId: "ap-biology", title: "Cell Respiration Lab", description: "Submit your completed lab report with data tables and a conclusion discussing the effect of temperature on respiration rate.", dueOffset: -2, dueTime: "11:59 PM", points: 50, status: "in-progress", type: "assignment" },
  { id: "chapter-7", courseId: "us-history", title: "Chapter 7 Reading Notes", description: "Annotate the chapter and respond to the five guided-reading prompts.", dueOffset: 0, dueTime: "10:00 PM", points: 20, status: "not-started", type: "assignment" },
  { id: "trig-review", courseId: "precalculus", title: "Trigonometry Review", description: "Complete problems 1–24. Show your work for all free-response questions.", dueOffset: 1, dueTime: "8:00 AM", points: 30, status: "in-progress", type: "assignment" },
  { id: "gatsby-response", courseId: "english-11", title: "Gatsby Close Reading", description: "Choose one passage from chapter four and write a 400-word close reading.", dueOffset: 2, dueTime: "11:59 PM", points: 25, status: "ready", type: "discussion" },
  { id: "genetics-quiz", courseId: "ap-biology", title: "Genetics Quiz", description: "Assessment covering Mendelian genetics, pedigrees, and non-Mendelian inheritance.", dueOffset: 3, dueTime: "9:00 AM", points: 40, status: "not-started", type: "quiz" },
  { id: "primary-source", courseId: "us-history", title: "Primary Source Analysis", description: "Compare the two assigned speeches using the sourcing framework.", dueOffset: 5, dueTime: "11:59 PM", points: 35, status: "not-started", type: "assignment" },
  { id: "unit-circle", courseId: "precalculus", title: "Unit Circle Practice", description: "Complete the interactive practice and upload your work.", dueOffset: 6, dueTime: "11:59 PM", points: 15, status: "not-started", type: "assignment" },
  { id: "vocab-5", courseId: "english-11", title: "Vocabulary Set 5", description: "Complete definitions, original sentences, and the short review quiz.", dueOffset: 8, dueTime: "9:00 AM", points: 20, status: "not-started", type: "quiz" },
  { id: "ecology-project", courseId: "ap-biology", title: "Ecology Field Project", description: "Prepare a visual summary of your field observations and analysis.", dueOffset: 11, dueTime: "11:59 PM", points: 100, status: "not-started", type: "assignment" },
  { id: "reconstruction", courseId: "us-history", title: "Reconstruction DBQ", description: "Write a thesis and evidence outline for the document-based question.", dueOffset: 13, dueTime: "11:59 PM", points: 60, status: "not-started", type: "assignment" },
  { id: "functions-test", courseId: "precalculus", title: "Functions Unit Test", description: "Unit assessment on transformations, inverses, and compositions.", dueOffset: -5, dueTime: "2:00 PM", points: 100, score: 91, status: "graded", type: "quiz" },
  { id: "gatsby-essay", courseId: "english-11", title: "Gatsby Theme Essay", description: "Final literary analysis essay.", dueOffset: -8, dueTime: "11:59 PM", points: 100, score: 94, status: "graded", type: "assignment" },
  { id: "mitosis-model", courseId: "ap-biology", title: "Mitosis Model", description: "Label and explain each stage of mitosis.", dueOffset: -10, dueTime: "3:00 PM", points: 30, score: 29, status: "graded", type: "assignment" },
  { id: "civil-war-map", courseId: "us-history", title: "Civil War Map", description: "Map key battles and annotate their strategic significance.", dueOffset: -12, dueTime: "11:59 PM", points: 25, status: "submitted", type: "assignment" },
  { id: "polynomial-practice", courseId: "precalculus", title: "Polynomial Practice", description: "Complete the assigned practice set.", dueOffset: -14, dueTime: "8:00 AM", points: 20, score: 18, status: "graded", type: "assignment" },
];

export const events: CalendarEvent[] = [
  { id: "science-club", courseId: "ap-biology", title: "Science Club Guest Speaker", offset: 2, time: "3:30 PM", type: "event" },
  { id: "history-review", courseId: "us-history", title: "Optional Review Session", offset: 4, time: "2:45 PM", type: "event" },
  { id: "essay-workshop", courseId: "english-11", title: "Essay Workshop", offset: 7, time: "1:45 PM", type: "event" },
];

export const notifications: Notification[] = [
  { id: "n1", courseId: "precalculus", title: "Functions Unit Test graded", detail: "You received 91 out of 100 points.", age: "18 min", read: false, kind: "grade" },
  { id: "n2", courseId: "ap-biology", title: "New announcement in AP Biology", detail: "Lab groups and updated materials are now posted.", age: "1 hr", read: false, kind: "announcement" },
  { id: "n3", courseId: "english-11", title: "Due date changed", detail: "Gatsby Close Reading is now due Friday at 11:59 PM.", age: "3 hr", read: false, kind: "assignment" },
  { id: "n4", courseId: "us-history", title: "Feedback posted", detail: "Mr. Thompson left feedback on Civil War Map.", age: "Yesterday", read: true, kind: "grade" },
  { id: "n5", courseId: "precalculus", title: "New material added", detail: "Unit Circle Reference Sheet was added to Week 6.", age: "Mon", read: true, kind: "announcement" },
];

export const materials: Record<string, Material[]> = {
  "ap-biology": [
    { id: "bio-f1", title: "Unit 3 · Cellular Energetics", type: "folder", children: [
      { id: "bio-p1", title: "Cell Respiration Overview", type: "page" },
      { id: "bio-p2", title: "Lab Data Template.pdf", type: "file" },
      { id: "bio-a1", title: "Cell Respiration Lab", type: "assignment" },
    ] },
    { id: "bio-f2", title: "Unit 4 · Genetics", type: "folder", children: [
      { id: "bio-p3", title: "Punnett Square Practice", type: "link" },
      { id: "bio-p4", title: "Genetics Study Guide.pdf", type: "file" },
    ] },
  ],
  "us-history": [{ id: "his-f1", title: "Reconstruction", type: "folder", children: [{ id: "his-p1", title: "Primary Sources", type: "page" }, { id: "his-p2", title: "Chapter 7 Slides.pdf", type: "file" }] }],
  precalculus: [{ id: "math-f1", title: "Trigonometry", type: "folder", children: [{ id: "math-p1", title: "Unit Circle Reference", type: "file" }, { id: "math-p2", title: "Desmos Practice", type: "link" }] }],
  "english-11": [{ id: "ela-f1", title: "The Great Gatsby", type: "folder", children: [{ id: "ela-p1", title: "Reading Calendar", type: "page" }, { id: "ela-p2", title: "Essay Rubric.pdf", type: "file" }] }],
};

export const defaultWidgets: WidgetConfig[] = [
  { id: "notifications", visible: true, size: "wide" },
  { id: "courses", visible: true, size: "large" },
  { id: "upcoming", visible: true, size: "medium" },
  { id: "grades", visible: true, size: "medium" },
  { id: "announcements", visible: false, size: "medium" },
  { id: "calendar", visible: false, size: "small" },
  { id: "progress", visible: false, size: "small" },
];
