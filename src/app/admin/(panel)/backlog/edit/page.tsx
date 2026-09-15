import Link from "next/link";
import { notFound } from "next/navigation";
import { findQueuedTopic, readBacklog } from "@/lib/backlog";
import { chipPrimary } from "../../ui";

export const dynamic = "force-dynamic";

export default async function EditTopicPage({
  searchParams,
}: PageProps<"/admin/backlog/edit">) {
  const sp = await searchParams;
  const original = typeof sp.topic === "string" ? sp.topic : "";
  const backlog = await readBacklog();
  const item = original ? findQueuedTopic(backlog, original) : undefined;
  if (!item) notFound();

  const error = typeof sp.error === "string" ? sp.error : null;
  const field =
    "mt-1 w-full rounded-md border border-border-soft px-3 py-2 text-ink";

  return (
    <div className="space-y-6">
      <Link href="/admin/backlog" className="text-sm text-slate-body hover:text-ink">
        ← Back
      </Link>

      <h1 className="text-2xl font-bold text-ink">Edit topic</h1>

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <form method="post" action="/api/admin/backlog/update" className="space-y-4">
        <input type="hidden" name="original" value={item.topic} />
        <div>
          <label className="block text-sm font-medium text-ink">Topic</label>
          <input name="topic" required defaultValue={item.topic} className={field} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">
            Notes <span className="text-slate-body">(optional angle)</span>
          </label>
          <input name="notes" defaultValue={item.notes ?? ""} className={field} />
        </div>
        <button
          type="submit"
          className={chipPrimary}
        >
          Save
        </button>
      </form>
    </div>
  );
}
