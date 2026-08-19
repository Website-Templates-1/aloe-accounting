"use client";

import { useState } from "react";

/**
 * Generate-draft button. On submit it disables itself and shows a spinner so
 * the owner can't fire multiple generations (each one costs an OpenAI call +
 * a commit + a deploy). The native form POST proceeds; the page redirects back
 * when the server responds, which resets the button.
 */
export function GenerateDraftButton() {
  const [submitting, setSubmitting] = useState(false);
  return (
    <form
      method="post"
      action="/api/admin/generate"
      onSubmit={() => setSubmitting(true)}
    >
      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="inline-flex items-center gap-2 rounded-md border border-brand-700 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent"
      >
        {submitting && (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {submitting ? "Generating…" : "Generate draft"}
      </button>
    </form>
  );
}
