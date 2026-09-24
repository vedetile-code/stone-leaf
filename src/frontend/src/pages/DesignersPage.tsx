import { Button } from "@/components/ui/button";
import { BRAND, OUTREACH_TEMPLATES, type OutreachTemplate } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Check, Copy, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

/** Trade-facing proof points — why a designer comes to the studio. */
const TRADE_POINTS = [
  {
    id: "specimen",
    index: "01",
    title: "Specimen Scale",
    body: "Rare, large-format indoor plants grown to architectural proportion — the single statement piece a room is built around, not a shelf filler.",
  },
  {
    id: "vessels",
    index: "02",
    title: "Stone & Vessel Pairing",
    body: "Every specimen arrives already paired with an artisan stone, matte ceramic, or cast concrete vessel. Finished on delivery, never a project for your client.",
  },
  {
    id: "open",
    index: "03",
    title: "Open Studio",
    body: "Our doors are open to the trade. Walk the collection at your own pace, see the pieces against limestone floors and coral stone walls, and talk through a project with whoever is on the floor.",
  },
  {
    id: "spec",
    index: "04",
    title: "Project Support",
    body: "Share a floor plan or a mood board and we curate to the light, the ceiling height, and the material palette of the space you are delivering.",
  },
] as const;

const CHANNEL_ICON = {
  whatsapp: MessageSquare,
  email: Mail,
} as const;

function TemplateCard({ template }: { template: OutreachTemplate }) {
  const [copied, setCopied] = useState(false);
  const Icon = CHANNEL_ICON[template.id as keyof typeof CHANNEL_ICON] ?? Mail;

  const copyText = template.subject
    ? `Subject: ${template.subject}\n\n${template.body}`
    : template.body;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article
      data-ocid={`designers.template_card.${template.id}`}
      className="flex flex-col border border-border bg-card shadow-subtle"
    >
      <header className="flex items-start justify-between gap-4 border-b border-border px-6 py-5 md:px-8">
        <div className="flex items-start gap-3.5">
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center border border-border text-accent">
            <Icon className="size-4" aria-hidden="true" />
          </span>
          <div>
            <h3 className="tracked text-[0.72rem] text-foreground">
              {template.label}
            </h3>
            <p className="eyebrow mt-2 text-muted-foreground">
              {template.channel}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCopy}
          data-ocid={`designers.copy_button.${template.id}`}
          aria-label={`Copy ${template.label}`}
          className={cn(
            "tracked shrink-0 rounded-none border-border px-4 text-[0.62rem] shadow-none transition-smooth",
            copied
              ? "border-accent text-accent"
              : "text-foreground hover:border-accent hover:bg-transparent hover:text-accent",
          )}
        >
          {copied ? (
            <Check className="size-3.5" aria-hidden="true" />
          ) : (
            <Copy className="size-3.5" aria-hidden="true" />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
      </header>

      <div className="flex flex-1 flex-col px-6 py-6 md:px-8">
        {template.subject ? (
          <p className="mb-5 border-l-2 border-accent pl-4 text-sm leading-relaxed text-foreground">
            <span className="eyebrow mr-2 text-muted-foreground">Subject</span>
            {template.subject}
          </p>
        ) : null}
        <p className="whitespace-pre-line text-sm leading-[1.85] text-muted-foreground">
          {template.body}
        </p>
      </div>

      <footer className="border-t border-border px-6 py-4 md:px-8">
        <p className="eyebrow text-muted-foreground">
          Replace the bracketed fields before sending
        </p>
      </footer>
    </article>
  );
}

/**
 * Designers & Architects — the trade page. Positions the studio for interior
 * designers and luxury architects as an open, welcoming place to visit, and
 * hands them copy-ready outreach templates in the brand voice.
 */
export function DesignersPage() {
  return (
    <div data-ocid="designers.page">
      {/* Hero — framed as a Bermuda interior room */}
      <section
        data-ocid="designers.hero_section"
        className="border-b border-border bg-gradient-subtle"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow reveal text-accent">Trade &amp; Specifiers</p>
            <h1 className="lockup reveal mt-7 max-w-3xl text-3xl leading-[1.15] md:text-5xl">
              A Studio for Designers &amp; Architects
            </h1>
            <p className="reveal mt-8 max-w-2xl text-base leading-[1.9] text-muted-foreground md:text-lg">
              {BRAND.name} is a working botanical studio on a Bermuda estate,
              open to the interior designers and luxury architects who specify
              living sculpture into their work. Come by, walk the collection
              against limestone floors and coral stone walls, and take the time
              you need.
            </p>
            <div className="reveal mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="eyebrow text-muted-foreground">
                {BRAND.appointmentLine}
              </span>
              <span aria-hidden="true" className="h-3 w-px bg-border" />
              <span className="eyebrow text-muted-foreground">
                {BRAND.studioHours}
              </span>
            </div>
          </div>

          <figure className="reveal">
            <div className="room-frame aspect-[4/5] w-full">
              <div className="stone-wall absolute inset-0" aria-hidden="true" />
              <div
                className="glazing-light absolute inset-x-0 top-0 h-1/2"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                <div className="ironwork-rule mb-6" aria-hidden="true" />
                <p className="eyebrow text-foreground/70">
                  The Studio Room · Bermuda
                </p>
                <p className="mt-3 max-w-xs text-sm leading-[1.8] text-foreground/80">
                  Coral stone walls, navy ironwork, and ocean-facing glazing —
                  the room the collection is chosen in.
                </p>
              </div>
            </div>
            <figcaption className="eyebrow mt-4 text-muted-foreground">
              The studio room — coral stone walls, limestone floors, and
              ocean-facing glazing in Bermuda
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Trade positioning */}
      <section
        data-ocid="designers.trade_section"
        className="border-b border-border bg-background"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">
              Why Specifiers Visit
            </p>
            <h2 className="lockup mt-6 text-2xl leading-tight md:text-3xl">
              Built for the Trade
            </h2>
          </div>

          <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">
            {TRADE_POINTS.map((point) => (
              <div
                key={point.id}
                data-ocid={`designers.trade_point.${point.index}`}
                className="bg-card p-8 md:p-10"
              >
                <span className="eyebrow text-accent">{point.index}</span>
                <h3 className="tracked mt-5 text-[0.78rem] text-foreground">
                  {point.title}
                </h3>
                <p className="mt-4 text-sm leading-[1.85] text-muted-foreground">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outreach templates */}
      <section
        data-ocid="designers.templates_section"
        className="border-b border-border bg-secondary/40"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">Outreach Templates</p>
            <h2 className="lockup mt-6 text-2xl leading-tight md:text-3xl">
              Introduce the Studio
            </h2>
            <p className="mt-6 text-sm leading-[1.9] text-muted-foreground md:text-base">
              Two introductions written in the {BRAND.name} voice — one short
              form for text or WhatsApp, one formal email. Copy either, replace
              the bracketed fields, and send it as your own.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {OUTREACH_TEMPLATES.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          <p className="eyebrow mt-10 text-muted-foreground">
            Placeholders — [Designer Name] · [Your Name] · [Parish Name] · [Your
            Phone Number]
          </p>
        </div>
      </section>

      {/* Closing invitation */}
      <section
        data-ocid="designers.invitation_section"
        className="bg-primary text-primary-foreground"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 px-6 py-20 md:flex-row md:items-center md:py-24">
          <div className="max-w-xl">
            <p className="eyebrow text-primary-foreground/60">
              {BRAND.appointmentLine}
            </p>
            <h2 className="lockup mt-6 text-2xl leading-tight md:text-3xl">
              Plan a Visit
            </h2>
            <p className="mt-6 text-sm leading-[1.9] text-primary-foreground/70 md:text-base">
              Tell us about the project, or simply stop in during studio hours —{" "}
              {BRAND.studioHours}. We will walk you through the collection and
              curate to the space you are delivering.
            </p>
          </div>
          <a
            href={`mailto:${BRAND.email}`}
            data-ocid="designers.plan_visit_button"
            className="tracked inline-flex shrink-0 items-center gap-3 border border-primary-foreground/40 px-8 py-4 text-[0.7rem] text-primary-foreground transition-smooth hover:bg-primary-foreground hover:text-primary"
          >
            <Mail className="size-4" aria-hidden="true" />
            {BRAND.email}
          </a>
        </div>
      </section>
    </div>
  );
}
