import {
  Award,
  Briefcase,
  DollarSign,
  GraduationCap,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const sanitize = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const iconMap = {
  sparkles: Sparkles,
  rocket: Rocket,
  users: Users,
  dollarsign: DollarSign,
  zap: Zap,
  trendingup: TrendingUp,
  graduationcap: GraduationCap,
  award: Award,
  briefcase: Briefcase,
};

const iconPalette = [
  { color: "text-secondary", bgColor: "bg-secondary/10" },
  { color: "text-primary", bgColor: "bg-primary/10" },
  { color: "text-accent", bgColor: "bg-accent/10" },
];

export function getProgramIconConfig(
  icon: string | null | undefined,
  slug: string,
  title: string
) {
  const direct = icon ? iconMap[sanitize(icon) as keyof typeof iconMap] : null;

  let fallback = Sparkles;
  const key = sanitize(`${slug}${title}`);

  if (key.includes("pre") || key.includes("idea")) fallback = Sparkles;
  else if (key.includes("incubation") || key.includes("startup"))
    fallback = Rocket;
  else if (key.includes("mentor")) fallback = Users;
  else if (key.includes("fund") || key.includes("grant")) fallback = DollarSign;
  else if (key.includes("accelerator") || key.includes("accelerat"))
    fallback = Zap;
  else if (key.includes("sector") || key.includes("growth"))
    fallback = TrendingUp;
  else if (key.includes("student") || key.includes("education"))
    fallback = GraduationCap;
  else if (key.includes("award")) fallback = Award;
  else if (key.includes("program")) fallback = Briefcase;

  const Icon = direct || fallback;
  const palette =
    iconPalette[Math.abs(slug.length + title.length) % iconPalette.length];

  return { Icon, color: palette.color, bgColor: palette.bgColor };
}
