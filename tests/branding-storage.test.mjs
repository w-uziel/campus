import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(path, dependencies = {}) {
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(source, { exports, require: (id) => {
    assert.ok(id in dependencies, `Unexpected dependency: ${id}`);
    return dependencies[id];
  } });
  return exports;
}

const storageModule = load("lib/browser-storage.ts");
const { readStoredValue } = storageModule;
function storage(values = {}) {
  const entries = new Map(Object.entries(values));
  return {
    getItem: (key) => entries.get(key) ?? null,
    setItem: (key, value) => entries.set(key, value),
    removeItem: (key) => entries.delete(key),
  };
}

test("all saved preferences, demo progress, and feedback drafts migrate without changing values", () => {
  for (const suffix of ["theme-v1", "visual-style-v1", "coolness-v1", "demo-v1", "material-export-v1", "feedback-draft-v1"]) {
    const oldKey = `campus-${suffix}`;
    const key = `schoology-${suffix}`;
    const saved = storage({ [oldKey]: '{"saved":"unchanged"}' });
    assert.equal(readStoredValue(key, saved), '{"saved":"unchanged"}');
    assert.equal(saved.getItem(key), '{"saved":"unchanged"}');
    assert.equal(saved.getItem(oldKey), null);
    saved.removeItem(key);
    assert.equal(readStoredValue(key, saved), null, "Cleared data must not reappear on reload");
  }
});

test("current saved values take precedence over legacy data", () => {
  const saved = storage({ "schoology-theme-v1": "light", "campus-theme-v1": "dark" });
  assert.equal(readStoredValue("schoology-theme-v1", saved), "light");
  assert.equal(saved.getItem("campus-theme-v1"), null);
});

test("a failed storage write preserves and returns the legacy data", () => {
  const saved = storage({ "campus-theme-v1": "dark" });
  saved.setItem = () => { throw new Error("Quota exceeded"); };
  assert.equal(readStoredValue("schoology-theme-v1", saved), "dark");
  assert.equal(saved.getItem("campus-theme-v1"), "dark");
});
