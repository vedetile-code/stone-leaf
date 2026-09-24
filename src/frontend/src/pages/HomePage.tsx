import { BrandLockup } from "@/components/BrandLockup";
import { BRAND, TAGLINES } from "@/lib/brand";
import { SPECIMENS, formatMaterial } from "@/lib/specimens";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const FEATURED = SPECIMENS[0];

/**
 * Home / Landing — the estate's front door.
 *
 * A full-bleed hero, the brand statement, a featured specimen preview, the
 * welcoming studio-hours signage moment, and the three retained taglines as a
 * selectable statement. Imagery is framed as Bermuda interior rooms.
 */
export function HomePage() {
  const [activeTagline, setActiveTagline] = useState(0);

  return (
    <div data-ocid="home.page">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        data-ocid="home.hero.section"
        className="relative isolate flex min-h-[92vh] items-center justify-center overflow-hidden bg-primary"
      >
        <img
          src="/assets/generated/hero-specimen.dim_1920x1080.jpg"
          alt="A rare specimen plant in a honed stone vessel on a limestone floor, set against a coral stone wall with navy ironwork glazing and ocean daylight"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/45 to-primary/85"
        />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center">
          <BrandLockup variant="stacked" onDark className="reveal" />
          <p
            className="eyebrow mt-10 text-primary-foreground/70 reveal"
            style={{ animationDelay: "120ms" }}
          >
            {BRAND.descriptor}
          </p>
          <h1
            className="lockup mt-8 text-2xl leading-[1.5] text-primary-foreground md:text-4xl reveal"
            style={{ animationDelay: "220ms" }}
          >
            Living Art for Modern Homes.
          </h1>
          <p
            className="mt-8 max-w-xl text-sm leading-relaxed text-primary-foreground/75 md:text-base reveal"
            style={{ animationDelay: "320ms" }}
          >
            A botanical studio and garden in Bermuda, curating rare indoor
            specimens already paired with their stone, matte ceramic, or
            concrete vessel. Our doors are open — come by and take your time.
          </p>
          <Link
            to="/contact"
            data-ocid="home.hero.primary_button"
            className="tracked group mt-12 inline-flex items-center gap-3 border border-primary-foreground/40 bg-primary-foreground/5 px-9 py-4 text-[0.7rem] text-primary-foreground transition-smooth hover:border-primary-foreground hover:bg-primary-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            Plan a Visit
            <ArrowRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* ── Brand statement ──────────────────────────────────────────── */}
      <section
        data-ocid="home.statement.section"
        className="wash-interior px-6 py-24 md:py-32"
      >
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <p className="eyebrow text-accent">The Studio</p>
            <div aria-hidden="true" className="mt-6 h-px w-16 bg-accent/50" />
          </div>
          <div className="md:col-span-8">
            <p className="font-display text-xl font-light leading-[1.7] text-foreground md:text-2xl">
              Stone &amp; Leaf is a micro-scale botanical studio working from a
              garden estate in Bermuda. We grow and curate a small number of
              large-scale indoor specimens, each finished with an architectural
              vessel before it is ever offered.
            </p>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Our doors are open through the week, so you can wander the
              collection at your own pace. Designers, architects, and anyone
              furnishing a room are welcome to stop in, stand a piece against
              the light and stone it was grown for, and take all the time they
              need.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured specimen ────────────────────────────────────────── */}
      <section
        data-ocid="home.featured.section"
        className="bg-secondary px-6 py-24 md:py-32"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
          <div className="relative">
            <div className="room-frame">
              <img
                src="/assets/generated/featured-monstera.dim_1200x1500.jpg"
                alt={`${FEATURED.name} trained against a honed limestone column in a Bermuda interior, with a coral stone wall, navy ironwork glazing, and ocean daylight across the limestone floor`}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <span className="eyebrow absolute left-0 top-0 -translate-y-1/2 bg-background px-4 py-2 text-foreground">
              Featured Specimen
            </span>
          </div>

          <div>
            <p className="eyebrow text-muted-foreground">
              {FEATURED.botanical}
            </p>
            <h2 className="lockup mt-6 text-2xl leading-[1.4] text-foreground md:text-3xl">
              {FEATURED.name}
            </h2>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
              {FEATURED.description}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8">
              <div>
                <dt className="eyebrow text-muted-foreground">Vessel</dt>
                <dd className="mt-2 text-sm text-foreground">
                  {FEATURED.vessel}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Material</dt>
                <dd className="mt-2 text-sm text-foreground">
                  {formatMaterial(FEATURED.material)}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Height</dt>
                <dd className="mt-2 text-sm text-foreground">
                  {FEATURED.height}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Scale</dt>
                <dd className="mt-2 text-sm text-foreground">Statement</dd>
              </div>
            </dl>

            <Link
              to="/collection"
              data-ocid="home.featured.link"
              className="tracked group mt-12 inline-flex items-center gap-3 border-b border-foreground/30 pb-2 text-[0.7rem] text-foreground transition-smooth hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-secondary"
            >
              View the Collection
              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Signage moment ───────────────────────────────────────────── */}
      <section
        data-ocid="home.signage.section"
        className="stone-wall px-6 py-24 md:py-32"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="room-frame">
              <img
                src="/assets/generated/signage-pillar.dim_1200x1500.jpg"
                alt="A limestone pillar at the studio entrance carrying a small matte plaque with the studio hours, framed by coral stone walls and navy ironwork glazing"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-7 md:pl-8">
            <p className="eyebrow text-accent">The Entrance</p>
            <h2 className="lockup mt-6 text-2xl leading-[1.4] text-foreground md:text-3xl">
              Come by the Studio
            </h2>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              At the gate, a single limestone pillar carries the studio's only
              sign. There is no queue and no rush — the doors are open through
              the week, and someone is always glad to walk you through the
              collection.
            </p>
            <div aria-hidden="true" className="ironwork-rule mt-10 max-w-xs" />
            <dl className="mt-8">
              <dt className="eyebrow text-muted-foreground">Studio Hours</dt>
              <dd className="mt-3 font-display text-lg font-light text-foreground md:text-xl">
                {BRAND.studioHours}
              </dd>
            </dl>
            <p className="eyebrow mt-8 text-muted-foreground">
              {BRAND.estateLine}
            </p>
          </div>
        </div>
      </section>

      {/* ── Tagline statement ────────────────────────────────────────── */}
      <section
        data-ocid="home.taglines.section"
        className="bg-primary px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow text-primary-foreground/60">In Our Own Words</p>

          <p
            aria-live="polite"
            className="lockup mt-12 min-h-[5rem] text-xl leading-[1.6] text-primary-foreground md:min-h-[6rem] md:text-3xl"
          >
            {TAGLINES[activeTagline]}
          </p>

          <div
            role="tablist"
            aria-label="Brand statements"
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            {TAGLINES.map((tagline, index) => (
              <button
                key={tagline}
                type="button"
                role="tab"
                aria-selected={activeTagline === index}
                data-ocid={`home.taglines.tab.${index + 1}`}
                onClick={() => setActiveTagline(index)}
                className={cn(
                  "tracked border-b pb-2 text-[0.65rem] transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-primary",
                  activeTagline === index
                    ? "border-primary-foreground text-primary-foreground"
                    : "border-transparent text-primary-foreground/45 hover:text-primary-foreground/80",
                )}
              >
                {`0${index + 1}`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing invitation ───────────────────────────────────────── */}
      <section
        data-ocid="home.invitation.section"
        className="glazing-light px-6 py-24 md:py-32"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="eyebrow text-muted-foreground">Come See Us</p>
          <h2 className="lockup mt-8 text-2xl leading-[1.5] text-foreground md:text-3xl">
            Sculpted by Nature. Formed for Design.
          </h2>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Tell us about the project and the light it lives in, or simply stop
            by the studio during opening hours. We would love to show you
            around.
          </p>
          <Link
            to="/contact"
            data-ocid="home.invitation.primary_button"
            className="tracked group mt-12 inline-flex items-center gap-3 bg-primary px-9 py-4 text-[0.7rem] text-primary-foreground transition-smooth hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-secondary"
          >
            Plan a Visit
            <ArrowRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
