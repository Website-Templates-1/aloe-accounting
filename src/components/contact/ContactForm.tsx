"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { trackConversion } from "@/lib/events";
import { services } from "@/lib/site.config";

const initial: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-pill bg-brand px-6 py-3.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-brand-600 disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send message"}
      {!pending && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  // Fire the conversion event + reset on success.
  useEffect(() => {
    if (state.status === "success") {
      trackConversion("quote_form_success");
      formRef.current?.reset();
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-card border border-brand-100 bg-brand-50 p-8"
      >
        <CheckCircle2 className="h-10 w-10 text-brand-700" aria-hidden="true" />
        <h2 className="text-xl font-bold text-ink">Message sent</h2>
        <p className="text-slate-body">{state.message}</p>
      </div>
    );
  }

  const err = state.errors ?? {};

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-5" noValidate>
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      {/* Honeypot (visually hidden, off-screen, aria-hidden) */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field id={`${uid}-name`} name="name" label="Name" required error={err.name} autoComplete="name" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${uid}-email`} name="email" type="email" label="Email" required error={err.email} autoComplete="email" />
        <Field id={`${uid}-phone`} name="phone" type="tel" label="Phone (optional)" autoComplete="tel" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${uid}-service`} className="text-sm font-semibold text-ink">
          Service of interest (optional)
        </label>
        <select
          id={`${uid}-service`}
          name="service"
          defaultValue=""
          className="rounded-xl border border-border-soft bg-white px-4 py-3 text-ink focus:border-brand focus:outline-none"
        >
          <option value="">Select a service…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="General enquiry">General enquiry</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${uid}-message`} className="text-sm font-semibold text-ink">
          How can we help? <span className="text-brand-700">*</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          required
          aria-invalid={!!err.message}
          aria-describedby={err.message ? `${uid}-message-err` : undefined}
          className="rounded-xl border border-border-soft bg-white px-4 py-3 text-ink focus:border-brand focus:outline-none"
        />
        {err.message && (
          <p id={`${uid}-message-err`} className="text-sm text-red-700">
            {err.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <SubmitButton />
        <p className="text-xs text-slate-body">
          We reply within one business day.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required = false,
  error,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label} {required && <span className="text-brand-700">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className="rounded-xl border border-border-soft bg-white px-4 py-3 text-ink focus:border-brand focus:outline-none"
      />
      {error && (
        <p id={`${id}-err`} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
