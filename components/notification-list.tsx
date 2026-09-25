"use client";

import type { Notification } from "@/lib/types";

export function NotificationList({ items, onRead }: { items: Notification[]; onRead: (id: string) => void }) {
  return <div>{items.map((item) => <button key={item.id} className={`notification-item notification-list-button ${item.read ? "" : "unread"}`} onClick={() => onRead(item.id)}><span className="notification-bullet" /><span className="notification-copy"><strong>{item.title}</strong><p>{item.detail}</p></span><span className="notification-age">{item.age}</span></button>)}</div>;
}
