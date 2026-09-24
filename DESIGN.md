# Design Brief

## Direction

Coral Stone & Ocean Light — a quiet-luxury Bermuda-interior architectural studio, where rare specimen plants read as sculpture inside real island rooms: coral stone walls, navy ironwork, and ocean-facing glazing light.

## Tone

Refined minimalism executed with conviction: an architectural firm / high-end gallery — calm, expensive, deliberate — but warm and openly welcoming rather than gatekept.

## Differentiation

Depth comes from layered limestone, sand, and coral-stone planes plus hairline ironwork rules — zero drop shadows — and every image is framed as a Bermuda interior room, so the plants, the room, and the wide-tracked lockup carry all the visual weight.

## Color Palette

| Token              | OKLCH          | Role                                          |
| ------------------ | -------------- | --------------------------------------------- |
| background         | 0.97 0.004 95  | Bermuda limestone white — dominant surface    |
| foreground         | 0.24 0.045 250 | Deep ocean navy — all text and ink            |
| card               | 0.985 0.003 95 | Cleanest limestone plane for specimen cards   |
| primary            | 0.24 0.045 250 | Deep ocean navy — buttons, footer, anchors    |
| accent             | 0.42 0.075 150 | Rich matte leaf-green — sparing highlights    |
| muted              | 0.94 0.011 90  | Soft sand beige — alternating section bands   |
| secondary          | 0.93 0.014 88  | Sand beige — chips, filters, quiet fills      |
| border             | 0.88 0.008 92  | Hairline rules and dividers                   |
| stone-coral        | 0.9 0.017 62   | Weathered coral stone wall surface            |
| stone-coral-deep   | 0.82 0.024 58  | Shaded coral-stone reveal / room-frame edge   |
| iron-navy          | 0.3 0.038 250  | Navy ironwork rails, mullions, gate rules     |
| glazing            | 0.955 0.014 205| Ocean-facing glazing daylight bleed           |
| gravel             | 0.88 0.006 96  | Pale gravel-drive neutral band                |
| interior-glow      | 0.965 0.012 78 | Warm interior daylight wash                   |

## Typography

- Display: Space Grotesk — lockup, section headings, taglines; thin weight, all-caps, 0.34em tracking
- Body: Satoshi — paragraphs, UI labels, form fields; light-to-regular weight
- Mono: Geist Mono — eyebrows, specimen captions, technical metadata; 0.22em tracking
- Scale: hero `text-4xl md:text-6xl lg:text-7xl lockup`, h2 `text-2xl md:text-4xl lockup`, label `eyebrow`, body `text-base md:text-lg font-light leading-relaxed`

## Elevation & Depth

No drop shadows on content; hierarchy is built from flat planes — limestone white (`background`), sand beige (`muted`/`secondary`), coral stone (`stone-coral`), and ocean navy (`primary`) — separated by 1px hairlines, with `shadow-room` reserved for framed interior imagery and `shadow-elevated` only for the visit modal.

## Structural Zones

| Zone    | Background             | Border        | Notes                                                          |
| ------- | ---------------------- | ------------- | -------------------------------------------------------------- |
| Header  | `bg-background/90` blur | `border-b`   | Sticky hairline rule, lockup left, tracked nav right            |
| Hero    | full-bleed interior room image + warm daylight wash | — | Lockup centered over a Bermuda interior, single navy "Plan a Visit" CTA |
| Content | alternates `bg-background` / `bg-muted/50` / `.wash-interior` | hairline-t | Editorial sections split by hairline rules and `.ironwork-rule` |
| Footer  | `bg-primary` navy      | `border-t`    | Limestone text, brand lockup, open-invitation line, nav         |

## Spacing & Rhythm

Sections breathe at `py-24 md:py-32` with a `max-w-6xl` container; content groups use 8/16/24px micro-spacing, and generous asymmetric margins keep the editorial grid off-centre rather than centered.

## Component Patterns

- Buttons: near-square (2px radius), uppercase tracked labels; primary = navy fill → leaf-green on hover; ghost = hairline border → navy fill on hover
- Cards: 2px radius, `bg-card`, hairline border, image-led with mono caption; imagery wrapped in `.room-frame` so each plant reads inside a Bermuda interior room
- Badges: rectangular pills at 2px radius, sand-beige fill, mono uppercase labels; active filter flips to navy fill with limestone text
- Surfaces: `.stone-wall` coral-stone texture for feature bands, `.glazing-light` for ocean-facing edges, `.gravel-band` for quiet neutral strips

## Motion

- Entrance: staggered `fade-up` (0.9s, cubic-bezier(0.22,1,0.36,1)) on hero lockup, then sections; `line-grow` hairlines scale in from left
- Hover: 0.4s `transition-smooth` on color, border, and opacity only — no scaling or bounce
- Decorative: slow `drift-slow` (9s) on ambient botanical imagery; `glazing-shift` (14s) and `daylight-warm` (11s) breathe light across interior surfaces

## Constraints

- Palette limited to limestone white, deep ocean navy, soft sand beige, matte leaf-green, plus coral-stone, gravel, and glazing-light neutrals — no bright flower colors, no tourist tropes
- All-caps wide-tracked type for brand and labels only; body copy stays sentence case for readability
- Open-invitation framing: welcoming, walk-in-friendly language ("Plan a Visit", "Come See Us") — no exclusivity, scarcity, or gatekeeping copy
- No drop shadows on content surfaces; depth via layered planes and hairlines only
- Product always framed as a finished masterpiece inside a Bermuda interior: rare plant already paired with its stone, matte ceramic, or concrete vessel, set against coral stone, navy ironwork, or glazing light

## Signature Detail

The hairline-and-limestone room frame — every specimen is presented inside a Bermuda interior (coral stone, ironwork, glazing light) rather than as an isolated product shot, where a 1px line and a stone reveal do the work other sites give to a shadow.
