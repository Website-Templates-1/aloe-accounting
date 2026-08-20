"use client";

import { useState } from "react";

/**
 * A POST form whose submit button disables itself and shows a spinner while
 * the request is in flight — prevents double-submits on the admin mutations
 * (generate / approve / delete). Optional `confirm` gates submission behind a
 * native confirm dialog; `hidden` adds hidden form fields (e.g. the slug).
 */
export function SubmitAction({
  action,
  label,
  pendingLabel,
  className,
  confirm,
  hidden,
}: {
  action: string;
  label: string;
  pendingLabel: string;
  className?: string;
  confirm?: string;
  hidden?: Record<string, string>;
}) {
  const [submitting, setSubmitting] = useState(false);
  return (
    <form
      method="post"
      action={action}
      onSubmit={(e) => {
        if (confirm && !window.confirm(confirm)) {
          e.preventDefault();
          return;
        }
        setSubmitting(true);
      }}
    >
      {hidden &&
        Object.entries(hidden).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className={`inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60 ${
          className ?? ""
        }`}
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
        {submitting ? pendingLabel : label}
      </button>
    </form>
  );
}
