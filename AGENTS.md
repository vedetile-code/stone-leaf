# Project Guidance

## User Preferences

- Ultra-clean thin all-caps sans-serif with wide letter spacing for the STONE & LEAF / BERMUDA lockup
- Palette limited to Bermuda limestone white, deep ocean navy, soft sand beige, and rich matte leaf-green
- Approachable luxury: open-invitation language, no gatekeeping or exclusivity framing
- Emphasize Bermuda interiors in visuals: coral stone walls, navy ironwork, ocean-facing glazing, limestone floors
- Quiet-luxury, modern minimalist coastal aesthetic; no bright flower colors or cliché tourist tropes
- Product framed as a finished masterpiece: rare indoor plant already paired with a high-end stone, matte ceramic, or concrete pot
- All three taglines retained as brand statements

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- TanStack Router: a route with validateSearch requires every Link/navigate to it to pass search — use search={(previous) => previous} to preserve active filters across list/detail navigation.
- Concurrent page tasks can leave App.tsx with inline placeholder components while the real page files exist unused; typecheck and build still pass, so route wiring must be verified by reading App.tsx rather than trusting a green build.
- The PocketIC backend lane imports the raw Candid idlFactory, so variant returns decode as { ok } / { err } with no __kind__ discriminator; the __kind__ shape exists only in the generated Backend wrapper class in src/frontend/src/backend.ts.
- A bare multi-line string literal as a Motoko function body is parsed as an unintended function call (M0097); use a single-line literal with \n escapes for static Markdown returned from a query.
- OQL row sources are per-collection: a List.List<T> uses ListEntity.toEntity, not MapEntity.toEntity (Map-only).
- getApiDoc belongs in its own mixin as a bare top-level mixin () block returning a static Markdown literal directly from the function body; binding it to a top-level let would make it stable state and trap at runtime.
- Biome's useTemplate rule rejects a template literal with no interpolation; outreach copy with bracketed placeholders must be a plain double-quoted string.
- index.html meta/og tags are rendered document-head content, so forbidden brand strings must be audited there alongside src/ — a copy pass that only greps src/ misses them.
- Backend getApiDoc strings are publicly readable and can carry stale brand copy that a frontend-only copy pass misses.
- BRAND.appointmentLine is the single most-reused invitation string (header, footer, CTAs, DesignersPage, ExperiencePage, ContactPage); changing it in brand.ts propagates everywhere without touching page files.
- Bermuda-interior emphasis is best expressed as reusable surface classes (.stone-wall, .wash-interior, .glazing-light, .room-frame, .ironwork-rule, .gravel-band) so every page frames imagery as an interior room without new components.
- generate_image does not honor exact requested pixel dimensions; it returns the nearest supported size while preserving the requested aspect ratio, so filename-encoded dimensions are display targets, not guaranteed pixels.
