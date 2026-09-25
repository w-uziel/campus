"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { assignments as seededAssignments, defaultWidgets, notifications as seededNotifications } from "@/lib/mock-data";
import type { Assignment, AssignmentStatus, Notification, WidgetConfig } from "@/lib/types";

type DemoContextValue = {
  assignments: Assignment[];
  notifications: Notification[];
  widgets: WidgetConfig[];
  hydrated: boolean;
  setAssignmentStatus: (id: string, status: AssignmentStatus) => void;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  saveWidgets: (widgets: WidgetConfig[]) => void;
  resetDemo: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);
const STORAGE_KEY = "campus-demo-v1";

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [assignments, setAssignments] = useState(seededAssignments);
  const [notifications, setNotifications] = useState(seededNotifications);
  const [widgets, setWidgets] = useState(defaultWidgets);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const task = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const state = JSON.parse(saved) as { assignments?: Assignment[]; notifications?: Notification[]; widgets?: WidgetConfig[] };
          if (state.assignments) setAssignments(state.assignments);
          if (state.notifications) setNotifications(state.notifications);
          if (state.widgets) setWidgets(state.widgets);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(task);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ assignments, notifications, widgets }));
  }, [assignments, notifications, widgets, hydrated]);

  const setAssignmentStatus = useCallback((id: string, status: AssignmentStatus) => {
    setAssignments((items) => items.map((item) => item.id === id ? { ...item, status } : item));
  }, []);
  const markNotificationRead = useCallback((id: string) => {
    setNotifications((items) => items.map((item) => item.id === id ? { ...item, read: true } : item));
  }, []);
  const markAllRead = useCallback(() => setNotifications((items) => items.map((item) => ({ ...item, read: true }))), []);
  const saveWidgets = useCallback((next: WidgetConfig[]) => setWidgets(next), []);
  const resetDemo = useCallback(() => {
    setAssignments(seededAssignments);
    setNotifications(seededNotifications);
    setWidgets(defaultWidgets);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(() => ({ assignments, notifications, widgets, hydrated, setAssignmentStatus, markNotificationRead, markAllRead, saveWidgets, resetDemo }), [assignments, notifications, widgets, hydrated, setAssignmentStatus, markNotificationRead, markAllRead, saveWidgets, resetDemo]);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used within DemoProvider");
  return context;
}
