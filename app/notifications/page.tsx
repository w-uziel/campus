"use client";

import { NotificationList } from "@/components/notification-list";
import { useDemo } from "@/components/demo-provider";
import { SketchIcon } from "@/components/ui/sketch-icon";

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllRead } = useDemo();
  const unread = notifications.filter((item) => !item.read).length;
  return <main className="page-shell"><div className="page-heading"><div><p className="eyebrow">Activity</p><h1>Notifications</h1><p className="page-subtitle">{unread} unread update{unread === 1 ? "" : "s"} from your courses.</p></div><button className="button" onClick={markAllRead} disabled={!unread}><SketchIcon name="check-all" size={16} /> Mark all read</button></div><section className="content-card"><NotificationList items={notifications} onRead={markNotificationRead} /></section></main>;
}
