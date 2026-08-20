import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const sp = await searchParams;
  const error =
    sp.error === "rate"
      ? "Too many attempts. Wait a minute and try again."
      : sp.error
        ? "Incorrect username or password."
        : null;

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6 py-16">
      <h1 className="text-2xl font-bold text-ink">ALOE admin</h1>
      <p className="mt-2 text-sm text-slate-body">
        Owner sign-in for reviewing and publishing Blog posts.
      </p>

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <form method="post" action="/api/admin/login" className="mt-6 space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-ink">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="mt-1 w-full rounded-md border border-border-soft px-3 py-2 text-ink"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-ink">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 w-full rounded-md border border-border-soft px-3 py-2 text-ink"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-brand-700 px-4 py-2 font-semibold text-white hover:bg-brand-800"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
