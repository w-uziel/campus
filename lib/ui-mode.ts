export type UiMode = "sketch" | "professional";

export const UI_MODE_STORAGE_KEY = "campus-ui-mode";
export const UI_MODE_CHANGE_EVENT = "campus-ui-mode-change";

// Apply the saved mode before first paint; only accept known CSS modes.
export const UI_MODE_BOOTSTRAP = `(function(){try{var mode=localStorage.getItem("${UI_MODE_STORAGE_KEY}");if(mode==="sketch"||mode==="professional")document.documentElement.dataset.uiMode=mode}catch(e){}})()`;
