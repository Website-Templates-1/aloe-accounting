/**
 * Secure, provider-agnostic email interface.
 *
 * This defines the CONTRACT the contact form depends on. No live provider,
 * DNS, or credentials are wired up yet (per project scope). At deployment,
 * set EMAIL_PROVIDER + provider env vars and the correct adapter takes over.
 *
 * Adding a provider = implement `EmailProvider` and register it below.
 * Nothing else in the app changes.
 */

export interface EmailMessage {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
}

export interface EmailProvider {
  readonly name: string;
  send(message: EmailMessage): Promise<{ ok: true } | { ok: false; error: string }>;
}

/**
 * Default adapter: logs the message server-side and succeeds. Safe for
 * local/staging so the form is fully testable without sending real mail.
 */
const consoleProvider: EmailProvider = {
  name: "console",
  async send(message) {
    // Server-side only — never logs to the client.
    console.info("[email:console] Would send:", {
      to: message.to,
      subject: message.subject,
    });
    return { ok: true };
  },
};

/**
 * Resend adapter stub. Reads RESEND_API_KEY at call time. Intentionally uses
 * fetch (no SDK dependency) so the interface stays dependency-free until a
 * provider is chosen. Not active unless EMAIL_PROVIDER=resend.
 */
const resendProvider: EmailProvider = {
  name: "resend",
  async send(message) {
    const key = process.env.RESEND_API_KEY;
    if (!key) return { ok: false, error: "Email provider not configured." };
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: message.from,
          to: message.to,
          reply_to: message.replyTo,
          subject: message.subject,
          text: message.text,
        }),
      });
      if (!res.ok) return { ok: false, error: `Provider error (${res.status}).` };
      return { ok: true };
    } catch {
      return { ok: false, error: "Email could not be sent. Please try again." };
    }
  },
};

const registry: Record<string, EmailProvider> = {
  console: consoleProvider,
  resend: resendProvider,
};

/** Resolve the active provider from env (defaults to console). */
export function getEmailProvider(): EmailProvider {
  const chosen = (process.env.EMAIL_PROVIDER ?? "console").toLowerCase();
  return registry[chosen] ?? consoleProvider;
}

/** Destination inbox for contact submissions (falls back to firm email). */
export function getContactInbox(): string {
  return process.env.CONTACT_INBOX ?? "info@aloecpa.com";
}

/** Verified sender identity (must be a domain you control at launch). */
export function getContactSender(): string {
  return process.env.CONTACT_SENDER ?? "website@aloeaccountingandtax.com";
}
