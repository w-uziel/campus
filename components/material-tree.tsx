"use client";

import { useState } from "react";
import type { Material } from "@/lib/types";
import { SketchIcon, type SketchIconName } from "./ui/sketch-icon";

const icons: Record<Material["type"], SketchIconName> = { folder: "folder", file: "file", link: "link", page: "page", assignment: "clipboard" };

function Node({ item, depth = 0 }: { item: Material; depth?: number }) {
  const [open, setOpen] = useState(depth === 0);
  const folder = item.type === "folder";
  return <div className="material-node"><button className="material-row" onClick={() => folder && setOpen((value) => !value)}>{folder ? <SketchIcon name={open ? "chevron-down" : "chevron-right"} size={14} /> : <span className="material-indent" />}<SketchIcon name={icons[item.type]} size={17} /><span>{item.title}</span><span className="material-kind">{item.type}</span></button>{folder && open && <div className="material-children">{item.children?.map((child) => <Node item={child} depth={depth + 1} key={child.id} />)}</div>}</div>;
}

export function MaterialTree({ items }: { items: Material[] }) {
  return <div>{items.map((item) => <Node key={item.id} item={item} />)}</div>;
}
