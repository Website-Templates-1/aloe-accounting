import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/lib/jsonld";

/**
 * Visible breadcrumbs. The SAME crumbs array is passed to breadcrumbSchema()
 * on the page so structured data matches the UI exactly.
 */
export function Breadcrumbs({
  crumbs,
  tone = "light",
}: {
  crumbs: Crumb[];
  tone?: "light" | "dark";
}) {
  const base = tone === "dark" ? "text-white/60" : "text-slate-body";
  const current = tone === "dark" ? "text-white" : "text-ink";
  const hover = tone === "dark" ? "hover:text-white" : "hover:text-brand-700";
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${base}`}>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {last ? (
                <span className={`font-medium ${current}`} aria-current="page">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className={`transition-colors ${hover}`}>
                    {c.name}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
