import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostForEdit } from "@/lib/blog-admin";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
  searchParams,
}: PageProps<"/admin/posts/[slug]">) {
  const { slug } = await params;
  const sp = await searchParams;
  const post = await getPostForEdit(slug);
  if (!post) notFound();

  const saved = Boolean(sp.saved);
  const error = typeof sp.error === "string" ? sp.error : null;

  const field =
    "mt-1 w-full rounded-md border border-border-soft px-3 py-2 text-ink";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="text-sm text-slate-body hover:text-ink">
          ← Back
        </Link>
        <Link
          href={`/admin/preview/${post.slug}`}
          className="text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          Preview
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-ink">Edit: {post.title}</h1>

      {saved && (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Saved.
        </p>
      )}
      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <form method="post" action="/api/admin/save" className="space-y-4">
        <input type="hidden" name="slug" value={post.slug} />
        <div>
          <label className="block text-sm font-medium text-ink">Title</label>
          <input name="title" defaultValue={post.title} className={field} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">
            Meta description
          </label>
          <input
            name="metaDescription"
            defaultValue={post.metaDescription}
            className={field}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Excerpt</label>
          <input name="excerpt" defaultValue={post.excerpt} className={field} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-ink">
              Published at
            </label>
            <input
              name="publishedAt"
              defaultValue={post.publishedAt}
              className={field}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">Author</label>
            <input
              name="author"
              defaultValue={post.author ?? ""}
              className={field}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">Status</label>
            <select name="status" defaultValue={post.status} className={field}>
              <option value="draft">draft</option>
              <option value="published">published</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">
            Body (Markdown)
          </label>
          <textarea
            name="body"
            defaultValue={post.bodyMarkdown}
            rows={22}
            className={`${field} font-mono text-sm`}
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-brand-700 px-5 py-2 font-semibold text-white hover:bg-brand-800"
        >
          Save
        </button>
      </form>
    </div>
  );
}
