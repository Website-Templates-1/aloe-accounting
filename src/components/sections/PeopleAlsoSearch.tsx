import Link from "next/link";
import { Search } from "lucide-react";

export interface RelatedSearch {
  label: string;
  href: string;
}

/**
 * "People also search for" — a chip cloud of related internal links, styled
 * like a search-engine related-searches strip. Strengthens internal linking
 * and surfaces related intent. All links are root-relative.
 */
export function PeopleAlsoSearch({
  items,
  title = "People also search for",
}: {
  items: RelatedSearch[];
  title?: string;
}) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-eyebrow text-slate-body">
        <Search className="h-4 w-4 text-brand" aria-hidden="true" />
        {title}
      </h2>
      <ul className="mt-6 flex flex-wrap gap-3">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <Link
              href={item.href}
              className="inline-flex items-center gap-2 rounded-pill border border-border-soft bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand-700"
            >
              <Search className="h-3.5 w-3.5 text-slate-body" aria-hidden="true" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
