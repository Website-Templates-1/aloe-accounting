import Link from "next/link";
import { site } from "@/lib/site.config";

/**
 * ALOE wordmark: green "A" monogram in a navy circle + "ALOE CPA".
 * Pure markup (no image request) so it renders instantly and crisply.
 */
export function Logo({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const wordColor = tone === "dark" ? "text-white" : "text-ink";
  const subColor = tone === "dark" ? "text-white/55" : "text-slate-body";
  return (
    <Link
      href="/"
      aria-label={`${site.brand} — home`}
      className={`inline-flex items-center gap-3 ${className}`}
    >
      <span
        aria-hidden="true"
        className="grid h-11 w-11 place-items-center rounded-full bg-navy-900 text-lg font-extrabold text-brand"
      >
        A
      </span>
      <span className="text-xl font-extrabold tracking-tight">
        <span className={wordColor}>ALOE</span>{" "}
        <span className={`font-semibold ${subColor}`}>CPA</span>
      </span>
    </Link>
  );
}
