# Design System

## Reference analysis

The site follows the visual design of shipa1.com: its colors, fonts, spacing, and section layouts, measured from the live page. The client asked for this match. No logo, text, or image from that site is used.

| Reference pattern | This site |
|---|---|
| White utility bar above a dark header | Same. Shows the phone and email once set, and the tagline until then. |
| Full-bleed hero photo with a frosted form | Same, with the consultation form split into three steps |
| Green pill badge above the headline | Same |
| Category cards along the base of the hero | One card per service category |
| Stat counters | Left out. No verified figures exist, so the hero shows two buttons instead. |
| Centered statement with pale pill, green words, and short rule | `statement` section |
| Photo with badge and floating card, beside a feature grid | `intro` section |
| Two dark cards on a near-black band | `dual_cta` section |
| Zigzag steps with dotted connectors | `process` section, stacked on mobile |
| Icon cards with a round arrow | Service cards |
| Outlined card carousel with a progress bar | Industries carousel |
| Text beside a framed photo, or an offset green block | `split` section |
| Dark bar overlapping the footer | `cta_banner` when it is the last section |
| Footer with a dark brand card and wavy underlines | Same, in five columns |
| Vertical tab on the page edge | Free Consultation tab |

## Tokens

All tokens live in `frontend/app/globals.css` under `@theme`. Components use token names only.

| Token | Value | Use |
|---|---|---|
| `brand` | `#008854` | Buttons, links, green text on light backgrounds |
| `brand-dark` | `#05734A` | Hover states |
| `brand-bright` | `#079460` | Decorative blocks |
| `brand-light` | `#10A36F` | Green text on dark backgrounds |
| `brand-tint` | `#E3F3EC` | Pale pills and icon backgrounds |
| `night` | `#060B1A` | Hero backgrounds |
| `dark` | `#0B0F19` | Header, dark bands |
| `charcoal` | `#1B1A1B` | Footer, number badges |
| `teal` | `#062E39` | FAQ questions, dark card tint |
| `heading` | `#0C0E1A` | Headings |
| `ink` | `#2D3340` | Body text |
| `muted` | `#5A6268` | Secondary text |
| `surface`, `surface-alt` | `#F8FAFC`, `#F3F4F7` | Alternating sections |
| `line` | `#E2E8F0` | Borders |

White text only passes WCAG AA on `brand`, so buttons use that rather than the brighter `#079460`. `brand-light` is a slightly lighter green than the reference, to stay readable over dark photos.

## Typography

DM Sans for headings and Poppins for body text, both self-hosted by `next/font`.

| Role | Size |
|---|---|
| Hero heading | 34px to 44px |
| Statement heading | 34px to 52px |
| Section heading | 30px to 44px |
| Card heading | 20px to 24px |
| Body | 15px to 18px |

Wrap words in asterisks in a CMS heading to show them in green, for example `Grow With *Digital Marketing*`.

## Layout

- Container: 1320px maximum, with 16px, 24px, and 32px side gutters
- Section spacing: 64px on mobile, 96px on desktop
- Sections alternate white, `surface`, and `dark` so long pages keep their rhythm
- Breakpoints follow Tailwind defaults. The full navigation appears at `lg` (1024px).

## Components

| Component | Location | Notes |
|---|---|---|
| `Button` | `components/ui/` | `primary`, `dark`, `white`, `outline`, `ghost`, in `pill` or `soft` shape, with optional arrow |
| `Highlight` | `components/ui/` | Renders starred heading words in green |
| `SectionHeading`, `Eyebrow` | `components/ui/` | Standard heading group, with `dark` and `center` options |
| `Icon` | `components/ui/` | Maps CMS icon names to Lucide. Keep in sync with `Fields::ICONS` in Laravel. |
| `CoverArt` | `components/ui/` | Original generated artwork, used when a record has no image |
| `Reveal` | `components/ui/` | Scroll fade. Use per section, not per card, and never above the fold. |
| `Prose` | `components/ui/` | Renders sanitized rich text |
| `AppLink` | `components/ui/` | Link with prefetching off |
| `SectionRenderer` | `components/sections/` | Maps CMS section types to components |

To add a section type: add it to `PageSection::TYPES` in Laravel, create the component, and register it in `SectionRenderer`.

## Imagery

Starter photos are CC0 stock images, listed with their sources in `backend/database/seeders/images/CREDITS.md`. They live in the media library, so editors can replace them under **Pages**, **Posts**, and **Site Settings > Company**. They are 960px wide, which is soft on a full-width hero, so use images at least 1920px wide for launch. The people shown are stock models and must not be presented as staff or clients.

`CoverArt` remains the fallback for any record without an image.

## Motion and accessibility

- Hero entrances use CSS, so the largest element isn't delayed by JavaScript.
- Reduced-motion preferences are respected in both CSS and Motion.
- Content stays visible without JavaScript.
- Pages have a skip link, visible focus rings, one `h1`, labelled form controls, and keyboard-operable menus. Escape closes menus.
- Hover menus respond to mouse input only, so a tap on a touch screen opens them reliably.
