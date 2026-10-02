"use client";

import { useSyncExternalStore } from "react";
import { UI_MODE_CHANGE_EVENT, UI_MODE_STORAGE_KEY, type UiMode } from "@/lib/ui-mode";

function getMode(): UiMode {
  return document.documentElement.dataset.uiMode === "professional" ? "professional" : "sketch";
}

function setMode(mode: UiMode) {
  document.documentElement.dataset.uiMode = mode;
  try {
    localStorage.setItem(UI_MODE_STORAGE_KEY, mode);
  } catch {
    // Switching still works when browser storage is unavailable.
  }
  window.dispatchEvent(new Event(UI_MODE_CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  function syncStorage(event: StorageEvent) {
    if (event.key !== UI_MODE_STORAGE_KEY && event.key !== null) return;
    document.documentElement.dataset.uiMode = event.newValue === "professional" ? "professional" : "sketch";
    onChange();
  }
  window.addEventListener(UI_MODE_CHANGE_EVENT, onChange);
  window.addEventListener("storage", syncStorage);
  return () => {
    window.removeEventListener(UI_MODE_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", syncStorage);
  };
}

function getServerMode(): UiMode {
  return "sketch";
}

export function UiModeSwitch() {
  const mode = useSyncExternalStore(subscribe, getMode, getServerMode);
  return (
    <div className="ui-mode-switch" role="group" aria-label="Interface style">
      <button type="button" aria-pressed={mode === "sketch"} onClick={() => setMode("sketch")}>Sketch</button>
      <button type="button" aria-pressed={mode === "professional"} onClick={() => setMode("professional")}>Professional</button>
    </div>
  );
}
