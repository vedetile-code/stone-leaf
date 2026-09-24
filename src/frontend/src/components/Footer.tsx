import { BrandLockup } from "@/components/BrandLockup";
import { BRAND, NAV_ITEMS, TAGLINES } from "@/lib/brand";
import { Link } from "@tanstack/react-router";

/**
 * Navy footer plane: brand lockup, the open-invitation line, visible studio
 * hours, the three brand statements, navigation, and the caffeine attribution.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <BrandLockup variant="stacked" onDark className="items-start" />
            <p className="eyebrow mt-8 text-primary-foreground/60">
              {BRAND.appointmentLine}
            </p>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-primary-foreground/70">
              A micro-scale botanical studio on a Bermuda estate, curating rare
              indoor specimens paired with architectural vessels. Come by and
              walk the collection at your own pace.
            </p>
            <div className="mt-6 max-w-xs">
              <p className="eyebrow text-primary-foreground/50">Studio Hours</p>
              <p
                data-ocid="footer.studio_hours"
                className="mt-2 text-sm font-light text-primary-foreground/80"
              >
                {BRAND.studioHours}
              </p>
            </div>
          </div>

          <nav aria-label="Footer" data-ocid="footer.nav">
            <p className="eyebrow text-primary-foreground/50">Navigate</p>
            <ul className="mt-6 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    data-ocid={`footer.${item.label.toLowerCase()}_link`}
                    className="tracked text-[0.7rem] text-primary-foreground/75 transition-smooth hover:text-primary-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-primary-foreground/50">The Studio</p>
            <ul className="mt-6 space-y-3 text-sm font-light text-primary-foreground/75">
              <li>{BRAND.estateLine}</li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  data-ocid="footer.email_link"
                  className="transition-smooth hover:text-primary-foreground"
                >
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND.phone.replace(/[^+\d]/g, "")}`}
                  data-ocid="footer.phone_link"
                  className="transition-smooth hover:text-primary-foreground"
                >
                  {BRAND.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <ul className="mt-14 flex flex-col gap-2 border-t border-primary-foreground/15 pt-8 md:flex-row md:gap-8">
          {TAGLINES.map((tagline) => (
            <li
              key={tagline}
              className="lockup text-[0.6rem] text-primary-foreground/55"
            >
              {tagline}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 text-[0.7rem] text-primary-foreground/50 md:flex-row md:items-center md:justify-between">
          <p className="tracked">
            © {year} {BRAND.name} {BRAND.region}
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="transition-smooth hover:text-primary-foreground"
          >
            © {year}. Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
