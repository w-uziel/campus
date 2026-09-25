import { MaterialTree } from "@/components/material-tree";
import { materials } from "@/lib/mock-data";

export default async function MaterialsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  return <section className="content-card"><div className="content-card-header"><h2>Materials</h2></div><MaterialTree items={materials[courseId] ?? []} /></section>;
}
