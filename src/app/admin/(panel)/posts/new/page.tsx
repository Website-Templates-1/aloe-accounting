import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NewPostPage({
  searchParams,
}: PageProps<"/admin/posts/new">) {
  const sp = await searchParams;
  const error = typeof sp.error === "string" ? sp.error : null;

  const field =
    "mt-1 w-full rounded-md border border-border-soft px-3 py-2 text-ink";

  return (
    <div className="space-y-6">
      <Link href="/admin" className="text-sm text-slate-body hover:text-ink">
        ← Back
      </Link>
      <h1 className="text-2xl font-bold text-ink">New draft</h1>
      <p className="text-sm text-slate-body">
        Creates a draft you can then enrich (FAQs, related searches, tags),
        preview, and approve. Nothing goes live until you approve it.
      </p>

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <form method="post" action="/api/admin/create" className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink">Title</label>
          <input name="title" required className={field} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">
            Slug{" "}
            <span className="text-slate-body">
              (optional — derived from the title if left blank)
            </span>
          </label>
          <input
            name="slug"
            placeholder="e.g. gst-hst-basics-for-new-businesses"
            className={field}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">
            Meta description{" "}
            <span className="text-slate-body">(~140–160 chars)</span>
          </label>
          <input name="metaDescription" required className={field} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Excerpt</label>
          <input name="excerpt" required className={field} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">
            Body (Markdown)
          </label>
          <textarea
            name="body"
            required
            rows={18}
            className={`${field} font-mono text-sm`}
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-brand-700 px-5 py-2 font-semibold text-white hover:bg-brand-800"
        >
          Create draft
        </button>
      </form>
    </div>
  );
}
