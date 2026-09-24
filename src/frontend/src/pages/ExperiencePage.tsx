import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface JourneyStep {
  index: string;
  title: string;
  caption: string;
  detail: string;
  image: string;
  alt: string;
}

const JOURNEY: JourneyStep[] = [
  {
    index: "01",
    title: "Come In From the Drive",
    caption: "The doors are open — no booking, no ceremony.",
    detail:
      "Park on the gravel and walk in. The studio sits behind a coral stone wall on a quiet Bermuda lane, and the doors are open through studio hours. Come as you are, bring a client or a floor plan, and take your time.",
    image: "/assets/generated/journey-invitation.dim_1200x1500.jpg",
    alt: "A Bermuda interior entry hall with coral stone walls, a limestone floor, and daylight falling through an open doorway onto the gravel drive beyond.",
  },
  {
    index: "02",
    title: "Walk the Rooms",
    caption: "Browse the collection in real light.",
    detail:
      "The collection is staged room by room, not on a retail floor. Wander at your own pace past navy ironwork glazing and limestone floors, and see how each specimen reads against real Bermuda daylight before you decide anything.",
    image: "/assets/generated/journey-arrival.dim_1200x1500.jpg",
    alt: "A Bermuda interior room with navy ironwork glazing, a coral stone wall, and specimen plants arranged along a pale limestone floor.",
  },
  {
    index: "03",
    title: "Chat With the Studio",
    caption: "Ask anything — we are here to talk it through.",
    detail:
      "Someone from the studio is always on hand to talk proportion, texture, and placement. Bring the room's dimensions and the light it gets, and we will work through the pairing together — plant and stone vessel resolved as one object.",
    image: "/assets/generated/journey-studio.dim_1200x1500.jpg",
    alt: "A large specimen plant in a matte concrete vessel on a pale limestone floor in a Bermuda studio room with coral stone walls and ocean daylight.",
  },
  {
    index: "04",
    title: "Take It Home, Placed",
    caption: "Delivered, styled, and left flawless.",
    detail:
      "When you are ready, your selection is delivered and installed by hand, positioned to the millimetre and finished with a care brief for the estate team. The piece arrives complete — nothing to pot, nothing to arrange, nothing left to chance.",
    image: "/assets/generated/journey-delivery.dim_1200x1500.jpg",
    alt: "Gloved hands steadying a heavy stone vessel holding a specimen plant as it is installed in a modern Bermuda coastal interior with ocean-facing glazing.",
  },
];

/**
 * The Experience — the four-step studio visit, told as an alternating
 * editorial sequence with a closing invitation to plan a visit.
 */
export function ExperiencePage() {
  return (
    <div data-ocid="experience.page">
      {/* Opening statement */}
      <section
        className="border-b border-border bg-gradient-subtle"
        data-ocid="experience.hero_section"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="eyebrow text-muted-foreground">
            {BRAND.appointmentLine}
          </p>
          <h1 className="lockup mt-6 max-w-3xl text-3xl leading-[1.15] md:text-5xl">
            The Experience
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Four easy movements, from the drive to the finished room. The studio
            is open to visitors — drop in, browse the collection, and talk it
            through with us. What leaves with you is already a finished work.
          </p>
          <p className="eyebrow mt-8 text-accent">{BRAND.studioHours}</p>
        </div>
      </section>

      {/* Journey steps */}
      <section
        className="mx-auto max-w-6xl px-6 py-20 md:py-28"
        data-ocid="experience.journey_section"
      >
        <ol className="flex flex-col gap-20 md:gap-28">
          {JOURNEY.map((step, position) => {
            const reversed = position % 2 === 1;
            return (
              <li
                key={step.index}
                data-ocid={`experience.step.${position + 1}`}
                className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
              >
                <div
                  className={cn("room-frame reveal", reversed && "md:order-2")}
                >
                  <img
                    src={step.image}
                    alt={step.alt}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-smooth hover:scale-[1.02]"
                  />
                </div>

                <div className={cn(reversed && "md:order-1")}>
                  <div className="flex items-baseline gap-4">
                    <span className="eyebrow text-accent">{step.index}</span>
                    <span className="ironwork-rule flex-1" aria-hidden="true" />
                  </div>
                  <h2 className="lockup mt-6 text-xl leading-snug md:text-2xl">
                    {step.title}
                  </h2>
                  <p className="tracked mt-4 text-[0.7rem] text-muted-foreground">
                    {step.caption}
                  </p>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                    {step.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Closing call to action */}
      <section
        className="border-t border-border bg-primary text-primary-foreground"
        data-ocid="experience.cta_section"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 py-20 md:flex-row md:items-end md:justify-between md:py-28">
          <div>
            <p className="eyebrow opacity-70">{BRAND.estateLine}</p>
            <h2 className="lockup mt-6 max-w-xl text-2xl leading-snug md:text-4xl">
              Plan a Visit
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed opacity-80 md:text-base">
              The studio is open {BRAND.studioHours}. Come by and browse the
              collection, or tell us about your project and we will have someone
              free to walk you through it.
            </p>
          </div>
          <Link
            to="/contact"
            data-ocid="experience.plan_visit_button"
            className="tracked inline-flex shrink-0 items-center border border-primary-foreground px-8 py-4 text-[0.7rem] transition-smooth hover:bg-primary-foreground hover:text-primary"
          >
            Come See Us
          </Link>
        </div>
      </section>
    </div>
  );
}
