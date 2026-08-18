"use server";

import {
  getEmailProvider,
  getContactInbox,
  getContactSender,
} from "@/lib/email";

export interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field-level errors keyed by field name. */
  errors?: Record<string, string>;
}

const MAX = { name: 120, email: 200, phone: 40, message: 4000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: FormDataEntryValue | null, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/**
 * Contact / quote form server action.
 * Validates input, then hands off to the provider-agnostic email interface.
 * Returns a typed state consumed by the client form via useActionState.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — bots fill hidden fields; humans don't.
  if (clean(formData.get("company_website"), 200)) {
    return { status: "success" }; // silently accept, drop
  }

  const name = clean(formData.get("name"), MAX.name);
  const email = clean(formData.get("email"), MAX.email);
  const phone = clean(formData.get("phone"), MAX.phone);
  const service = clean(formData.get("service"), 120);
  const message = clean(formData.get("message"), MAX.message);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10)
    errors.message = "Please add a little more detail (10+ characters).";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the fields below.", errors };
  }

  const provider = getEmailProvider();
  const result = await provider.send({
    to: getContactInbox(),
    from: getContactSender(),
    replyTo: email,
    subject: `New enquiry from ${name}${service ? ` — ${service}` : ""}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      service ? `Service of interest: ${service}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (!result.ok) {
    return {
      status: "error",
      message:
        "Sorry — we couldn't send your message. Please email or call us directly.",
    };
  }

  return {
    status: "success",
    message: "Thanks — we've received your message and will reply within one business day.",
  };
}
