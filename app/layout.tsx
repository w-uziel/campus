import type { Metadata } from "next";
import "./globals.css";
import { AppHeader } from "@/components/app-header";
import { DemoProvider } from "@/components/demo-provider";
import { ChaosLayer } from "@/components/ui/chaos-layer";
import { HoverNoteEffects } from "@/components/ui/hover-note-effects";

export const metadata: Metadata = {
  title: { default: "Campus", template: "%s · Campus" },
  description: "School, without the visual noise.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <DemoProvider>
          <ChaosLayer />
          <HoverNoteEffects />
          <AppHeader />
          {children}
        </DemoProvider>
      </body>
    </html>
  );
}
