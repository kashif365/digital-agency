# Design System

## Direction

Evergrove's site is dark, type-led, and built from original graphics rather than stock photography. Large headlines carry the message, and green is saved for emphasis and the main action.

The homepage follows a simple sales argument: the problem, what we do, how we work, why us, sample work, who we help, answers, and the form. Each section has one job, and there is one main action throughout: the free consultation.

There are no statistics, client logos, or ratings in the design, because none are verified yet. The hero graphic explains the idea instead of showing a dashboard, since any figure there would read as a real result. Proof sections appear on their own once real data exists. See [Guardrails](../README.md#guardrails-against-unverified-claims).

## Brand

- **Name:** Evergrove. An evergreen stays green all year, and a grove grows stronger together.
- **Tagline:** Marketing that keeps growing
- **Mark:** three rising chevrons, which read as both an evergreen and a line going up. It lives in `BrandMark` in `components/layout/Logo.js`, and in `app/icon.svg`.
- **Voice:** plain, direct, and honest. Sentence case in headings. No jargon, and no promises about rankings or returns.

## Motion

Animation is there to guide the eye, and every piece respects the visitor's reduced-motion setting.

- **Slider:** `Slider` (Embla) powers the services carousel. It can be dragged, loops, and pauses on hover or focus. Autoplay is off for reduced motion.
- **Project gallery:** `ProjectGallery` shows tall panels where one opens wide on hover, tap, or Enter. It stays on the last opened panel and does not auto-play. Below 768px it becomes a numbered accordion.
- **Hero showcase:** `HeroShowcase` is a photo slider with one timed tab per channel. The tab's progress bar drives the timing, so pausing it pauses the slide.
- **Problem illustrations:** `ProblemArt` draws an animated SVG for each problem card, chosen by the item's icon (`layers`, `chart-column`, or `gauge`). Other icons show a large icon instead. The graphics carry no figures, so they cannot read as real results.
- **Scroll entrances:** `Stagger` brings grid items in one after another. `Reveal` does the same for a single block. Neither runs above the fold.
- **Headline:** hero words rise in with CSS, so the largest text never waits on JavaScript.
- **Progress bar:** `ScrollProgress` tracks reading position along the top of the window.

## Hero

The hero follows patterns from established agency sites reviewed in November 2026: a short, very large headline on a plain dark background, one crisp visual beside the text, and a first step that asks for almost nothing.

- **Quick start:** one website field. It scrolls to the consultation form and fills in the website, so the full form stays in one place. If the page has no form, it opens `/free-consultation`.
- **Graphic:** `GrowthSystem`, edited through the hero section's items and graphic fields.
- **Reassurance line:** the section's Reassurance line field. Keep it to statements that are true for every visitor.

## Tokens

All tokens live in `frontend/app/globals.css` under `@theme`. Components use token names only.

| Token | Value | Use |
|---|---|---|
| `brand` | `#008854` | Buttons, links, green text on light backgrounds |
| `brand-dark` | `#05734A` | Hover states, icons on `brand-tint` |
| `brand-bright` | `#079460` | Decorative blocks |
| `brand-light` | `#10A36F` | Green text and icons on dark backgrounds |
| `brand-tint` | `#E3F3EC` | Pale icon backgrounds and notices |
| `night` | `#060B1A` | Header, heroes, dark sections, footer |
| `teal` | `#062E39` | Background glow |
| `heading` | `#0C0E1A` | Headings |
| `ink` | `#2D3340` | Body text |
| `muted` | `#5A6268` | Secondary text |
| `surface`, `surface-alt` | `#F8FAFC`, `#F3F4F7` | Alternating sections |
| `line` | `#E2E8F0` | Borders |

White text only passes WCAG AA on `brand`, so buttons use that rather than the brighter `#079460`.

## Typography

Bricolage Grotesque for headings and DM Sans for everything else, both self-hosted by `next/font`.

| Role | Size |
|---|---|
| Hero heading | 44px to 76px |
| Page heading | 44px to 60px |
| Section heading | 34px to 48px |
| Card heading | 20px to 28px |
| Body | 16px to 20px |

Wrap words in asterisks in a CMS heading to show them in green, for example `Marketing that *keeps growing*`.

## Layout

- Container: 1320px maximum, with 16px, 24px, and 32px side gutters
- Section spacing: 80px on mobile, 112px on desktop
- Sections alternate white, `surface`, and `night` so long pages keep their rhythm
- Headings sit left, not centered. Only the closing call to action is centered.
- Breakpoints follow Tailwind defaults. The full navigation appears at `lg` (1024px).

## Components

| Component | Location | Notes |
|---|---|---|
| `Button` | `components/ui/` | `primary`, `dark`, `white`, `outline`, `ghost`, with optional arrow |
| `Highlight` | `components/ui/` | Renders starred heading words in green |
| `SectionHeading`, `Heading`, `Eyebrow` | `components/ui/` | Standard heading group, with `dark` and `center` options |
| `Icon` | `components/ui/` | Maps CMS icon names to Lucide. Keep in sync with `Fields::ICONS` in Laravel. |
| `CoverArt` | `components/ui/` | Original generated artwork, used when a record has no image |
| `Reveal` | `components/ui/` | Scroll fade. Use per section, not per card, and never above the fold. |
| `Prose` | `components/ui/` | Renders sanitized rich text |
| `AppLink` | `components/ui/` | Link with prefetching off |
| `GrowthSystem` | `components/home/` | The hero graphic. Its labels come from the hero section in the CMS. |
| `ConsultationPanel` | `components/home/` | Dark section with the form, used on the homepage and service pages |
| `CookieConsent` | `components/layout/` | Loads analytics only after consent. Renders nothing until an analytics ID is set. |
| `SectionRenderer` | `components/sections/` | Maps CMS section types to components |

To add a section type: add it to `PageSection::TYPES` in Laravel, create the component, and register it in `SectionRenderer`.

## Imagery

Pages use original graphics, so nothing depends on stock photos of people. `CoverArt` fills any portfolio or blog record without an image.

Only the blog has starter photos. They are CC0 stock images, listed with their sources in `backend/database/seeders/images/CREDITS.md`, and the people shown are stock models who must not be presented as staff or clients. Editors can replace them under **Posts**.

When real team or project photos exist, upload them under **Pages**. Hero sections show an uploaded image dimmed behind the text, so use images at least 1920px wide.

## Motion and accessibility

- Hero entrances use CSS, so the largest element isn't delayed by JavaScript.
- Reduced-motion preferences are respected in both CSS and Motion.
- Content stays visible without JavaScript.
- Pages have a skip link, visible focus rings, one `h1`, labelled form controls, and keyboard-operable menus. Escape closes menus.
- Hover menus respond to mouse input only, so a tap on a touch screen opens them reliably.
