import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { AppHeader } from "@/components/app-header";
import { DemoProvider } from "@/components/demo-provider";
import { ChaosLayer } from "@/components/ui/chaos-layer";
import { HoverNoteEffects } from "@/components/ui/hover-note-effects";
import { UI_MODE_BOOTSTRAP } from "@/lib/ui-mode";

export const metadata: Metadata = {
  title: { default: "Campus", template: "%s · Campus" },
  description: "School, without the visual noise.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.variable} data-ui-mode="sketch" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: UI_MODE_BOOTSTRAP }} />
      </head>
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
