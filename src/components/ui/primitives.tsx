import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  tone = "surface",
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  tone?: "surface" | "alt" | "navy";
  as?: "section" | "div";
}) {
  const tones = {
    surface: "bg-white text-ink",
    alt: "bg-surface-alt text-ink",
    navy: "bg-navy-900 text-white",
  } as const;
  return (
    <Tag className={`py-16 sm:py-24 ${tones[tone]} ${className}`}>{children}</Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Eyebrow pill                                                        */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const styles =
    tone === "dark"
      ? "border-white/15 text-white/80"
      : "border-border-soft text-slate-body";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-pill border px-4 py-1.5 text-xs font-semibold uppercase tracking-eyebrow ${styles}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

type ButtonVariant = "primary" | "dark" | "ghost" | "ghost-dark";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

const buttonVariants: Record<ButtonVariant, string> = {
  // green fill, dark text (hero primary CTA)
  primary:
    "bg-brand text-navy-950 hover:bg-brand-600 focus-visible:outline-brand",
  // dark navy fill, white text (header "Get a Quote")
  dark: "bg-navy-900 text-white hover:bg-navy-800 focus-visible:outline-navy-900",
  // outline on light surfaces
  ghost:
    "border border-border-soft bg-white text-ink hover:border-navy-900 focus-visible:outline-navy-900",
  // outline on dark surfaces
  "ghost-dark":
    "border border-white/20 text-white hover:bg-white/10 focus-visible:outline-white",
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  withArrow?: boolean;
  external?: boolean;
  /** analytics hook */
  dataEvent?: string;
  ariaLabel?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  withArrow = false,
  external = false,
  dataEvent,
  ariaLabel,
}: ButtonLinkProps) {
  const cls = `${buttonBase} ${buttonVariants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {withArrow && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
    </>
  );
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        data-event={dataEvent}
        aria-label={ariaLabel}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-event={dataEvent} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Text link with up-right arrow ("Learn more")                        */
/* ------------------------------------------------------------------ */

export function ArrowLink({
  href,
  children,
  className = "",
  tone = "brand",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "brand" | "ink";
}) {
  const color = tone === "brand" ? "text-brand-700" : "text-ink";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-sm font-semibold ${color} ${className}`}
    >
      {children}
      <ArrowUpRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading block                                               */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
  accent,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  accent?: string;
}) {
  const alignCls = align === "center" ? "text-center items-center mx-auto" : "";
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const introColor = tone === "dark" ? "text-white/70" : "text-slate-body";
  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${alignCls}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={`h-display text-3xl sm:text-4xl md:text-[2.75rem] ${titleColor}`}
      >
        {title}
        {accent && <span className="text-brand"> {accent}</span>}
      </h2>
      {intro && (
        <p className={`text-lg leading-relaxed ${introColor}`}>{intro}</p>
      )}
    </div>
  );
}
