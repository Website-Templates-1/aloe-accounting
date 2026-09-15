/**
 * Shared admin-panel chrome: one family of h-9 pills used on chip rows,
 * list-row actions, and form submits so Blog / Reviews / Backlog stay in sync.
 */
export const chip =
  "inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-pill border px-4 text-sm font-semibold leading-none";

export const chipIdle = `${chip} border-border-soft bg-white text-slate-body hover:text-ink`;

export const chipPrimary = `${chip} border-brand-700 bg-brand-700 text-white hover:bg-brand-800`;

export const chipDanger = `${chip} border-red-200 bg-white text-red-600 hover:bg-red-50`;

export const chipOn = `${chip} border-brand-700 bg-brand-700 text-white`;

export const rowActions = "mt-3 flex flex-wrap items-center gap-2";

export const listCard =
  "mt-4 divide-y divide-border-soft rounded-card border border-border-soft bg-white";

export const listRow = "px-5 py-4";
