import Link from "next/link";

export default function NotFound() {
  return <main className="page-shell"><div className="empty"><p className="eyebrow">404 / wrong turn</p><h1>That page isn’t in Campus.</h1><p>It may have moved, or the demo data may not include it.</p><Link href="/" className="button primary not-found-action">Back to dashboard</Link></div></main>;
}
