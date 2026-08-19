"use client";

/** Delete-draft form with a native confirm() so it can't fire accidentally. */
export function DeleteDraftButton({ slug }: { slug: string }) {
  return (
    <form
      method="post"
      action="/api/admin/delete"
      onSubmit={(e) => {
        if (!confirm("Delete this draft? This removes the file from the repo.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="slug" value={slug} />
      <button className="rounded-md border border-red-300 px-3 py-1.5 font-semibold text-red-600 hover:bg-red-50">
        Delete
      </button>
    </form>
  );
}
