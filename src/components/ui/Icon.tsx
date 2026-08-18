import {
  Calculator,
  Building2,
  ClipboardCheck,
  TrendingUp,
  User,
  Shield,
  CalendarClock,
  Store,
  Truck,
  Factory,
  Briefcase,
  Heart,
  Landmark,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/** String-keyed icon map so config stays server-safe data (no JSX imports). */
const registry: Record<string, LucideIcon> = {
  calculator: Calculator,
  building: Building2,
  "clipboard-check": ClipboardCheck,
  "trending-up": TrendingUp,
  user: User,
  shield: Shield,
  "calendar-clock": CalendarClock,
  store: Store,
  truck: Truck,
  factory: Factory,
  briefcase: Briefcase,
  heart: Heart,
  landmark: Landmark,
  sparkles: Sparkles,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = registry[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
