import Link from "next/link";
import { SubmitAction } from "../SubmitAction";
import { readBacklog, unusedCount } from "@/lib/backlog";
import { usingGitHub } from "@/lib/github";

export const dynamic = "force-dynamic";

export default async function BacklogPage({
  searchParams,
}: PageProps<"/admin/backlog">) {
  const sp = await searchParams;
  const backlog = await readBacklog();
  const queued = backlog.topics.filter((t) => !t.used);
  const used = backlog.topics.filter((t) => t.used);

  const notice = sp.added
    ? `Added ${sp.added} topic(s).`
    : sp.suggested
      ? sp.suggested === "0"
        ? "No new topics — the AI's ideas were already in the backlog."
        : `Added ${sp.suggested} AI-suggested topic(s).`
      : null;
  const error = typeof sp.error === "string" ? sp.error : null;

  const field =
    "mt-1 w-full rounded-md border border-border-soft px-3 py-2 text-ink";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/admin" className="text-sm text-slate-body hover:text-ink">
            ← Back
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-ink">Topic backlog</h1>
          <p className="text-sm text-slate-body">
            {unusedCount(backlog)} topic(s) queued for the generator.
            {!usingGitHub && " Local content (GitHub not configured)."}
          </p>
        </div>
        <SubmitAction
          action="/api/admin/backlog/suggest"
          label="Suggest topics with AI"
          pendingLabel="Thinking…"
          className="rounded-md border border-brand-700 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 disabled:hover:bg-transparent"
        />
      </div>

      {notice && (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {notice}
        </p>
      )}
      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <section className="rounded-card border border-border-soft bg-white p-6">
        <h2 className="font-semibold text-ink">Add a topic</h2>
        <form method="post" action="/api/admin/backlog/add" className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-ink">Topic</label>
            <input name="topic" required className={field} />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">
              Notes <span className="text-slate-body">(optional angle)</span>
            </label>
            <input name="notes" className={field} />
          </div>
          <button
            type="submit"
            className="rounded-md bg-brand-700 px-5 py-2 font-semibold text-white hover:bg-brand-800"
          >
            Add topic
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-eyebrow text-slate-body">
          Queued ({queued.length})
        </h2>
        {queued.length === 0 ? (
          <p className="mt-3 text-sm text-slate-body">
            No topics queued. Add one above or let the AI suggest some.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border-soft rounded-card border border-border-soft bg-white">
            {queued.map((t) => (
              <li key={t.topic} className="px-5 py-4">
                <p className="font-semibold text-ink">{t.topic}</p>
                {t.notes && (
                  <p className="text-sm text-slate-body">{t.notes}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {used.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-eyebrow text-slate-body">
            Already used ({used.length})
          </h2>
          <ul className="mt-4 divide-y divide-border-soft rounded-card border border-border-soft bg-white/60">
            {used.map((t) => (
              <li key={t.topic} className="px-5 py-3 text-sm text-slate-body">
                {t.topic}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
