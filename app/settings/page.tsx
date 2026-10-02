"use client";

import { useDemo } from "@/components/demo-provider";
import { SketchIcon } from "@/components/ui/sketch-icon";

export default function SettingsPage() {
  const { resetDemo } = useDemo();
  return <main className="page-shell settings-page">
    <div className="page-heading"><div><p className="eyebrow">Campus</p><h1>Settings</h1><p className="page-subtitle">Manage this local prototype.</p></div></div>
    <section className="content-card settings-card">
      <div className="settings-icon"><SketchIcon name="settings" size={21} /></div>
      <div><h2>Demo data</h2><p>Restore assignment states, notifications, and dashboard widgets to their original values.</p></div>
      <button className="button danger" onClick={resetDemo}><SketchIcon name="reset" size={15} /> Reset demo</button>
    </section>
  </main>;
}
