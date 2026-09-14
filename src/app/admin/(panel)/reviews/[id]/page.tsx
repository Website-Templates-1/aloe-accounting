import Link from "next/link";
import { notFound } from "next/navigation";
import { SubmitAction } from "../../SubmitAction";
import { getReview } from "@/lib/review-api";
import {
  normalizeSentiment,
  reviewStage,
  stageBadgeClass,
  stageLabel,
  starDisplay,
  type ReviewView,
} from "@/lib/reviews-view";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

function Stars({ rating }: { rating: number }) {
  const { filled, empty } = starDisplay(rating);
  return (
    <span
      className="text-base text-amber-500"
      aria-label={`${filled} out of 5 stars`}
    >
      <span aria-hidden="true">{"★".repeat(filled)}</span>
      <span aria-hidden="true" className="text-slate-body/40">
        {"★".repeat(empty)}
      </span>
    </span>
  );
}

function AnalysisRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="text-xs font-semibold uppercase tracking-eyebrow text-slate-body">
        {label}
      </dt>
      <dd className="text-sm text-ink">{children}</dd>
    </div>
  );
}

export default async function ReviewDetailPage({
  params,
  searchParams,
}: PageProps<"/admin/reviews/[id]">) {
  const { id } = await params;
  const sp = await searchParams;

  let review: ReviewView | null = null;
  let loadError: string | null = null;
  try {
    review = await getReview(id);
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Could not load this review.";
  }

  if (!loadError && !review) notFound();

  const notice =
    sp.notice === "saved"
      ? "Changes saved."
      : sp.notice === "regenerated"
        ? "A fresh response has been drafted."
        : sp.notice === "approved"
          ? null // shown as the prominent approved banner below
          : null;
  const error =
    typeof sp.error === "string"
      ? sp.error
      : loadError
        ? loadError
        : null;

  if (!review) {
    return (
      <div className="space-y-6">
        <Link href="/admin/reviews" className="text-sm text-slate-body hover:text-ink">
          ← Back to reviews
        </Link>
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      </div>
    );
  }

  const stage = reviewStage(review);
  const approved = review.approval?.status === "approved";
  const analysis = review.analysis;
  const sentiment = normalizeSentiment(analysis?.sentiment);
  const topics = (analysis?.topics ?? []).filter((t) => t && t.trim());
  const analysisReady = analysis?.status === "ready";
  const hasAnyAnalysis =
    sentiment !== "—" ||
    topics.length > 0 ||
    Boolean(analysis?.summary?.trim()) ||
    Boolean(analysis?.suggestedTone?.trim());

  return (
    <div className="space-y-6">
      <Link href="/admin/reviews" className="text-sm text-slate-body hover:text-ink">
        ← Back to reviews
      </Link>

      {notice && (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {notice}
        </p>
      )}
      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {/* Review block */}
      <section className="rounded-card border border-border-soft bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Stars rating={review.rating} />
            <span className="font-semibold text-ink">
              {review.author?.name || "Anonymous"}
            </span>
            <span className="text-xs text-slate-body">
              {formatDate(review.reviewedAt)}
            </span>
          </div>
          <span className={stageBadgeClass(stage)}>{stageLabel(stage)}</span>
        </div>
        {review.text && (
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-body">
            {review.text}
          </p>
        )}
      </section>

      {/* AI analysis block */}
      <section className="rounded-card border border-border-soft bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-eyebrow text-slate-body">
          AI analysis
        </h2>
        {!analysisReady && (
          <p className="mt-3 text-sm text-slate-body">Analysis in progress…</p>
        )}
        {analysisReady && !hasAnyAnalysis && (
          <p className="mt-3 text-sm text-slate-body">
            No analysis details available for this review.
          </p>
        )}
        {analysisReady && hasAnyAnalysis && (
          <dl className="mt-4 space-y-4">
            {sentiment !== "—" && (
              <AnalysisRow label="Sentiment">{sentiment}</AnalysisRow>
            )}
            {topics.length > 0 && (
              <AnalysisRow label="Key themes">
                <span className="flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <span
                      key={t}
                      className="rounded-pill border border-border-soft bg-surface-alt px-3 py-1 text-xs text-ink"
                    >
                      {t}
                    </span>
                  ))}
                </span>
              </AnalysisRow>
            )}
            {analysis?.summary?.trim() && (
              <AnalysisRow label="What stood out">
                {analysis.summary}
              </AnalysisRow>
            )}
            {analysis?.suggestedTone?.trim() && (
              <AnalysisRow label="Recommended approach">
                {analysis.suggestedTone}
              </AnalysisRow>
            )}
          </dl>
        )}
      </section>

      {/* Suggested response block */}
      <section className="rounded-card border border-border-soft bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-eyebrow text-slate-body">
          Suggested response
        </h2>

        {approved ? (
          <div className="mt-4 space-y-4">
            <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="font-semibold text-emerald-800">Response approved</p>
              <p className="mt-1 text-sm text-emerald-800">
                Your approved response has been added to the review management
                queue.
              </p>
            </div>
            <div className="whitespace-pre-line rounded-md border border-border-soft bg-surface-alt px-4 py-3 text-sm text-ink">
              {review.reply?.body || "—"}
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <form
              method="post"
              action={`/api/admin/reviews/${review.id}/reply`}
              className="space-y-3"
            >
              <label htmlFor="reply-body" className="sr-only">
                Suggested response
              </label>
              <textarea
                id="reply-body"
                name="body"
                defaultValue={review.reply?.body ?? ""}
                rows={8}
                className="w-full rounded-md border border-border-soft px-3 py-2 text-sm text-ink"
                placeholder={
                  review.reply?.status === "failed"
                    ? "Response generation failed — write a reply or try regenerating."
                    : "Your response to this review…"
                }
              />
              <button
                type="submit"
                className="rounded-md bg-brand-700 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-800"
              >
                Save changes
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-3 border-t border-border-soft pt-4">
              <SubmitAction
                action={`/api/admin/reviews/${review.id}/regenerate`}
                label="Regenerate"
                pendingLabel="Regenerating…"
                className="rounded-md border border-brand-700 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 disabled:hover:bg-transparent"
              />
              <SubmitAction
                action={`/api/admin/reviews/${review.id}/approve`}
                confirm="Approve this response? It will be added to the review management queue."
                label="Approve response"
                pendingLabel="Approving…"
                className="rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
              />
              <p className="text-xs text-slate-body">
                Saving or regenerating won&rsquo;t approve — approval is a
                separate, explicit step.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
