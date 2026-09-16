import Link from "next/link";
import { listReviews } from "@/lib/review-api";
import {
  REVIEW_FILTERS,
  REVIEW_FILTERS_READONLY,
  filterLabel,
  isReviewFilter,
  isUnanswered,
  reviewStage,
  stageBadgeClass,
  stageLabel,
  starDisplay,
  statusFilterToParam,
  snippet,
  type ReviewFilter,
  type ReviewView,
} from "@/lib/reviews-view";
import { formatDate } from "@/lib/format";
import { adminFeatures } from "@/lib/site.config";
import { chipIdle, chipOn, listCard, listRow } from "../ui";

export const dynamic = "force-dynamic";

function Stars({ rating }: { rating: number }) {
  const { filled, empty } = starDisplay(rating);
  return (
    <span
      className="text-sm text-amber-500"
      aria-label={`${filled} out of 5 stars`}
      title={`${filled} / 5`}
    >
      <span aria-hidden="true">{"★".repeat(filled)}</span>
      <span aria-hidden="true" className="text-slate-body/40">
        {"★".repeat(empty)}
      </span>
    </span>
  );
}

export default async function ReviewsPage({
  searchParams,
}: PageProps<"/admin/reviews">) {
  const sp = await searchParams;
  const managed = adminFeatures.reviewReplies;
  const filters = managed ? REVIEW_FILTERS : REVIEW_FILTERS_READONLY;
  const defaultFilter: ReviewFilter = "all";
  const filter: ReviewFilter = isReviewFilter(sp.filter) ? sp.filter : defaultFilter;
  const allowed = (filters as readonly string[]).includes(filter)
    ? filter
    : defaultFilter;

  let reviews: ReviewView[] = [];
  let error: string | null = null;
  try {
    reviews = await listReviews(statusFilterToParam(allowed));
    if (allowed === "unanswered") {
      reviews = reviews.filter(isUnanswered);
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load reviews.";
  }

  let badgeCount: number | null = null;
  if (!error) {
    if (allowed === "unanswered" || allowed === "needs_review") {
      badgeCount = reviews.length;
    } else if (allowed === "all") {
      badgeCount = managed
        ? reviews.filter((r) => reviewStage(r) === "needs_review").length
        : reviews.filter(isUnanswered).length;
    } else {
      try {
        const pending = managed
          ? await listReviews("needs_review")
          : (await listReviews()).filter(isUnanswered);
        badgeCount = pending.length;
      } catch {
        badgeCount = null;
      }
    }
  }

  const notice = sp.notice === "approved" ? "Response approved." : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink">Reviews</h1>
        <p className="mt-1 text-sm text-slate-body">
          {managed
            ? "Review the responses drafted for your customer reviews, make any edits, and approve the ones you\u2019re happy with."
            : "Customer reviews from Google. Unanswered ones are flagged so you can reply on your Google Business Profile."}
        </p>
      </div>

      {notice && (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {notice}
        </p>
      )}

      <div className="-mx-6 overflow-x-auto px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max items-center gap-2">
        {filters.map((f) => {
          const active = f === allowed;
          const href = f === "all" ? "/admin/reviews" : `/admin/reviews?filter=${f}`;
          const showBadge =
            (f === "needs_review" || f === "unanswered") &&
            badgeCount !== null &&
            badgeCount > 0;
          return (
            <Link
              key={f}
              href={href}
              aria-current={active ? "page" : undefined}
              className={active ? chipOn : chipIdle}
            >
              {filterLabel(f)}
              {showBadge && (
                  <span
                    className={`ml-2 rounded-pill px-2 py-0.5 text-xs ${
                      active ? "bg-white/20" : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {badgeCount}
                  </span>
                )}
            </Link>
          );
        })}
        </div>
      </div>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : reviews.length === 0 ? (
        <div className="rounded-card border border-border-soft bg-white px-6 py-12 text-center">
          <p className="text-sm text-slate-body">
            {allowed === "needs_review"
              ? "Nothing needs your review right now. You\u2019re all caught up."
              : allowed === "unanswered"
                ? "No unanswered reviews."
              : allowed === "approved" || allowed === "replied"
                ? managed
                  ? "No approved responses yet."
                  : "No replied reviews yet."
                : "No reviews yet."}
          </p>
        </div>
      ) : (
        <ul className={listCard}>
          {reviews.map((r) => {
            const unanswered = isUnanswered(r);
            const stage = reviewStage(r);
            const badge = managed
              ? { className: stageBadgeClass(stage), label: stageLabel(stage) }
              : unanswered
                ? {
                    className: stageBadgeClass("needs_review"),
                    label: "Unanswered",
                  }
                : { className: stageBadgeClass("approved"), label: "Replied" };
            return (
              <li key={r.id}>
                <Link
                  href={`/admin/reviews/${r.id}`}
                  className={`${listRow} flex flex-col gap-2 hover:bg-surface-alt sm:flex-row sm:items-start sm:justify-between`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-semibold text-ink">
                        {r.author?.name || "Anonymous"}
                      </span>
                      <Stars rating={r.rating} />
                      <span className="text-xs text-slate-body">
                        {formatDate(r.reviewedAt)}
                      </span>
                    </div>
                    {r.text && (
                      <p className="mt-1 text-sm text-slate-body">
                        {snippet(r.text)}
                      </p>
                    )}
                  </div>
                  <span className={`${badge.className} shrink-0`}>
                    {badge.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
