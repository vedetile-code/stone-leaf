/**
 * Stone & Leaf — brand constants.
 *
 * Single source of truth for the lockup, taglines, navigation, and the
 * trade-outreach templates. Copy is written in the brand voice: quiet-luxury
 * and unhurried, but open and welcoming — the studio is a place you come to,
 * not a door you have to get past.
 */

export const BRAND = {
  name: "Stone & Leaf",
  region: "Bermuda",
  descriptor: "Botanical Studio",
  /** The single open-invitation line, reused by header, footer, and CTAs. */
  appointmentLine: "Open to Visit · Come by the Studio",
  estateLine: "Studio & Gardens · Bermuda",
  /** When the studio doors are open — no booking required to stop in. */
  studioHours: "Tuesday – Saturday · 10am – 5pm",
  email: "studio@stoneandleaf.bm",
  phone: "+1 (441) 000 0000",
} as const;

/** The three retained brand statements. */
export const TAGLINES = [
  "Living Art for Modern Homes.",
  "Bespoke Indoor Greenery.",
  "Sculpted by Nature. Formed for Design.",
] as const;

export type Tagline = (typeof TAGLINES)[number];

export interface NavItem {
  label: string;
  to: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Collection", to: "/collection" },
  { label: "Experience", to: "/experience" },
  { label: "Designers", to: "/designers" },
  { label: "Contact", to: "/contact" },
];

export interface OutreachTemplate {
  id: string;
  label: string;
  channel: string;
  subject?: string;
  body: string;
}

/**
 * Copy-ready trade outreach templates. Placeholders are bracketed so a
 * designer can read and adapt them without editing the brand voice.
 */
export const OUTREACH_TEMPLATES: OutreachTemplate[] = [
  {
    id: "whatsapp",
    label: "Text / WhatsApp Introduction",
    channel: "Short form",
    body: "Hi [Designer Name], this is [Your Name] from Stone & Leaf. We curate rare, large-scale indoor specimen plants paired with artisan stone pots at our studio and gardens in [Parish Name]. We're open to visitors most days, so there's no need to book ahead — come by and take your time walking the collection. I'd love to show you the pieces we've just finished for a few island interiors. Let me know when suits you and I'll put the kettle on. Best, [Your Name].",
  },
  {
    id: "email",
    label: "Formal Email Introduction",
    channel: "Long form",
    subject:
      "An Open Invitation: Statement Indoor Flora at Stone & Leaf Bermuda",
    body: `Dear [Designer Name],

I am reaching out from Stone & Leaf, a micro-scale botanical studio working from our studio and gardens in Bermuda.

We specialize exclusively in high-ticket, indoor specimen plants perfectly paired with architectural stone and concrete vessels. We grow and curate our collection specifically to complement modern, high-end island architecture.

Our doors are open to designers and architects most days, and we're always glad to walk you through the collection in person — no appointment needed. Come by the studio, see the pieces against our limestone floors and coral stone walls, and take the time you need to choose.

We would be delighted to welcome you to the studio and gardens. Drop us a line, or simply stop in during studio hours, and we'll make sure someone is free to show you around.

Warm regards,

[Your Name]
Stone & Leaf Bermuda
Open to Visit · Come by the Studio
[Your Phone Number]`,
  },
];
