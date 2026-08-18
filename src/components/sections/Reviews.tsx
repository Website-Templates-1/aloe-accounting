import { Container, SectionHeading, ArrowLink } from "@/components/ui/primitives";
import { getReviews, type Review } from "@/lib/reviews";

/**
 * Testimonials sourced from the firm's Google Business Profile (live via the
 * Places API when configured; owner-approved static reviews otherwise).
 * Visible HTML only — no Review/AggregateRating JSON-LD. Includes Google
 * attribution and links back to the profile.
 */
export async function Reviews() {
  const data = await getReviews();
  if (data.reviews.length === 0) return null;

  return (
    <Container>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="Client voices" title="The reason we" accent="get referred." />
        <div className="flex flex-col items-start gap-1">
          {data.source === "google" && data.rating != null && (
            <div className="flex items-center gap-2 text-sm text-slate-body">
              <Stars rating={Math.round(data.rating)} />
              <span className="font-semibold text-ink">
                {data.rating.toFixed(1)}
              </span>
              {data.total != null && <span>· {data.total} Google reviews</span>}
            </div>
          )}
          <ArrowLink href={data.profileUrl}>
            {data.source === "google" ? "Read our reviews on Google" : "See us on Google"}
          </ArrowLink>
        </div>
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.reviews.map((r, i) => (
          <li key={`${r.author}-${i}`}>
            <ReviewCard review={r} />
          </li>
        ))}
      </ul>

      <p className="mt-8 text-xs text-slate-body">
        Reviews sourced from Google.
      </p>
    </Container>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col gap-6 rounded-card border border-border-soft bg-white p-8">
      <Stars rating={review.rating} />
      <blockquote className="text-base leading-relaxed text-ink">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-border-soft pt-6">
        {review.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.photoUrl}
            alt=""
            width={44}
            height={44}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <span className="grid h-11 w-11 place-items-center rounded-full bg-navy-900 font-bold text-brand">
            {review.author.charAt(0)}
          </span>
        )}
        <span className="min-w-0">
          {review.authorUrl ? (
            <a
              href={review.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block truncate font-bold text-ink hover:text-brand-700"
            >
              {review.author}
            </a>
          ) : (
            <span className="block truncate font-bold text-ink">{review.author}</span>
          )}
          <span className="block text-sm text-slate-body">
            {review.relativeTime ?? "Verified client"}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex gap-1" role="img" aria-label={`${full} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={i < full ? "h-5 w-5 text-brand" : "h-5 w-5 text-border-soft"}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}
