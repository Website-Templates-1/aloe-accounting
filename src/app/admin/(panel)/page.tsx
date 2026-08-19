import Link from "next/link";
import { SubmitAction } from "./SubmitAction";
import { listAllPosts } from "@/lib/blog-admin";
import { usingGitHub } from "@/lib/github";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: PageProps<"/admin">) {
  const sp = await searchParams;
  const posts = await listAllPosts();
  const drafts = posts.filter((p) => p.status === "draft");
  const published = posts.filter((p) => p.status === "published");

  const notice = sp.approved
    ? "Post approved — it will go live on the next deploy."
    : sp.deleted
      ? "Draft deleted."
      : sp.generated
        ? `Draft generated: ${sp.generated}`
        : null;
  const error = typeof sp.error === "string" ? sp.error : null;

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Resources</h1>
          <p className="mt-1 text-sm text-slate-body">
            {usingGitHub
              ? "Live from GitHub."
              : "Local content (GitHub not configured)."}
          </p>
        </div>
        <SubmitAction
          action="/api/admin/generate"
          label="Generate draft"
          pendingLabel="Generating…"
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

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-eyebrow text-slate-body">
          Drafts awaiting approval ({drafts.length})
        </h2>
        {drafts.length === 0 ? (
          <p className="mt-3 text-sm text-slate-body">No drafts.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border-soft rounded-card border border-border-soft bg-white">
            {drafts.map((p) => (
              <li
                key={p.slug}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              >
                <div>
                  <p className="font-semibold text-ink">{p.title}</p>
                  <p className="text-xs text-slate-body">
                    {formatDate(p.publishedAt)} · {p.slug}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Link
                    href={`/admin/preview/${p.slug}`}
                    className="text-slate-body hover:text-ink"
                  >
                    Preview
                  </Link>
                  <Link
                    href={`/admin/posts/${p.slug}`}
                    className="font-semibold text-brand-700 hover:text-brand-800"
                  >
                    Edit
                  </Link>
                  <SubmitAction
                    action="/api/admin/approve"
                    hidden={{ slug: p.slug }}
                    label="Approve"
                    pendingLabel="Approving…"
                    className="rounded-md bg-brand-700 px-3 py-1.5 font-semibold text-white hover:bg-brand-800"
                  />
                  <SubmitAction
                    action="/api/admin/delete"
                    hidden={{ slug: p.slug }}
                    confirm="Delete this draft? This removes the file from the repo."
                    label="Delete"
                    pendingLabel="Deleting…"
                    className="rounded-md border border-red-300 px-3 py-1.5 font-semibold text-red-600 hover:bg-red-50"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-eyebrow text-slate-body">
          Published ({published.length})
        </h2>
        {published.length === 0 ? (
          <p className="mt-3 text-sm text-slate-body">Nothing published yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border-soft rounded-card border border-border-soft bg-white">
            {published.map((p) => (
              <li
                key={p.slug}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              >
                <div>
                  <p className="font-semibold text-ink">{p.title}</p>
                  <p className="text-xs text-slate-body">
                    {formatDate(p.publishedAt)} · {p.slug}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Link
                    href={`/resources/${p.slug}`}
                    className="text-slate-body hover:text-ink"
                  >
                    View live
                  </Link>
                  <Link
                    href={`/admin/posts/${p.slug}`}
                    className="font-semibold text-brand-700 hover:text-brand-800"
                  >
                    Edit
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
