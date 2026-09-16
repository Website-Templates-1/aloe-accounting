import { PasswordField } from "../../login/PasswordField";
import { SubmitAction } from "../SubmitAction";
import { hasCustomPassword, loadOwnerRecord } from "@/lib/credentials";
import { MIN_PASSWORD_LENGTH } from "@/lib/auth";
import { chipPrimary } from "../ui";

export const dynamic = "force-dynamic";

const ERRORS: Record<string, string> = {
  rate: "Too many attempts. Wait a few minutes and try again.",
  current: "Current password is incorrect.",
  mismatch: "New password and confirmation don't match.",
  same: "Pick a password that's different from the current one.",
  config: "Admin login is not configured. Set OWNER_USERNAME and OWNER_PASSWORD_HASH.",
  save: "Couldn't save the new password. Try again.",
};

export default async function AccountPage({
  searchParams,
}: PageProps<"/admin/account">) {
  const sp = await searchParams;
  const custom = await hasCustomPassword();
  const username = (await loadOwnerRecord())?.username ?? "admin";
  const errorParam = typeof sp.error === "string" ? sp.error : null;
  const error =
    errorParam && (ERRORS[errorParam] ?? (errorParam.length > 3 ? errorParam : null));

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Account</h1>
        <p className="mt-1 text-sm text-slate-body">
          Set the password you&apos;ll use to sign in. Username stays{" "}
          <span className="font-medium text-ink">{username}</span>.
        </p>
      </div>

      {!custom && (
        <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          You&apos;re still on the studio-issued password. Set your own so only
          you can sign in.
        </p>
      )}

      {sp.saved && (
        <p
          role="status"
          className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          Password updated. Use it the next time you sign in.
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <div className="rounded-card border border-border-soft bg-white p-6">
        <SubmitAction
          action="/api/admin/password"
          label="Update password"
          pendingLabel="Saving…"
          className={`${chipPrimary} mt-4`}
        >
          <div className="space-y-4">
            <PasswordField
              id="current"
              name="current"
              label="Current password"
              autoComplete="current-password"
            />
            <PasswordField
              id="next"
              name="next"
              label="New password"
              autoComplete="new-password"
              minLength={MIN_PASSWORD_LENGTH}
            />
            <PasswordField
              id="confirm"
              name="confirm"
              label="Confirm new password"
              autoComplete="new-password"
              minLength={MIN_PASSWORD_LENGTH}
            />
            <p className="text-xs text-slate-body">
              At least {MIN_PASSWORD_LENGTH} characters, no spaces.
            </p>
          </div>
        </SubmitAction>
      </div>
    </div>
  );
}
