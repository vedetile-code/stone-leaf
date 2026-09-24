import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface BrandLockupProps {
  /** "stacked" for the hero / footer, "inline" for the header. */
  variant?: "stacked" | "inline";
  /** Render in limestone white for use on navy surfaces. */
  onDark?: boolean;
  className?: string;
}

/**
 * The STONE & LEAF / BERMUDA lockup — thin all-caps display type with wide
 * letter spacing. The single most important brand element, so it lives in one
 * component and is never re-typed.
 */
export function BrandLockup({
  variant = "inline",
  onDark = false,
  className,
}: BrandLockupProps) {
  const tone = onDark ? "text-primary-foreground" : "text-foreground";

  if (variant === "stacked") {
    return (
      <span className={cn("flex flex-col items-center", tone, className)}>
        <span className="lockup text-2xl leading-none md:text-4xl">
          {BRAND.name}
        </span>
        <span className="lockup mt-3 text-[0.6rem] leading-none opacity-70 md:text-xs">
          {BRAND.region}
        </span>
      </span>
    );
  }

  return (
    <span className={cn("flex items-baseline gap-2.5", tone, className)}>
      <span className="lockup text-sm leading-none md:text-base">
        {BRAND.name}
      </span>
      <span
        aria-hidden="true"
        className="h-3 w-px bg-current opacity-30 md:h-3.5"
      />
      <span className="lockup text-[0.55rem] leading-none opacity-70 md:text-[0.65rem]">
        {BRAND.region}
      </span>
    </span>
  );
}
