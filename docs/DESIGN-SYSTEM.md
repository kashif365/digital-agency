# Design System

## Direction

Evergrove's site is light, editorial, and type-led. Pages sit on warm ivory, headlines are set large in a serif, and deep forest green carries the dark sections and the main action. The aim is a site that reads as art-directed by people, not assembled from a kit: hairline rules instead of cards, numbered rows instead of icon grids, and layouts that change from section to section.

The brand idea is growth over time. An evergreen stays green all year, and a grove grows stronger together. That shows up in one signature motif, the growth rings (see below), and in the copy, never as leaves or landscape imagery. Evergrove is a marketing agency, not a garden business.

There are no statistics, client logos, or ratings in the design, because none are verified yet. Graphics show the shape of the work (a search, a roadmap, a campaign) without figures, so nothing can read as a real result. Proof sections appear on their own once real data exists. See [Guardrails](../README.md#guardrails-against-unverified-claims).

## Brand

- **Name:** Evergrove
- **Mark:** three rising chevrons, which read as both an evergreen and a line going up. It lives in `BrandMark` in `components/layout/Logo.js` and in `app/icon.svg`: sage on forest, or forest on sage when the background is dark.
- **Voice:** plain, specific, and honest. Sentence case in headings. Each section answers one question a visitor actually has. No promises about rankings or returns, and no invented history, team size, or clients.

## Color

All tokens live in `frontend/app/globals.css` under `@theme`. Components use token names only.

| Token | Value | Use |
|---|---|---|
| `ivory` | `#F5F3EC` | Page background |
| `paper` | `#FBFAF6` | Forms, pricing cards, raised surfaces on ivory |
| `stone` | `#EBE7DC` | Alternate section background |
| `line` | `#D8D3C4` | Hairline rules and borders |
| `forest` | `#112C25` | Headings, primary buttons, dark sections |
| `forest-soft` | `#1A3A31` | Panels inside forest sections |
| `charcoal` | `#202624` | Footer, so it reads apart from a forest section above it |
| `ink` | `#2F3633` | Body text |
| `muted` | `#5E6662` | Secondary text |
| `sage` | `#B8CC8A` | Accent on dark backgrounds, buttons in dark sections |
| `moss` | `#47612F` | Italic accent words on light backgrounds |
| `clay` | `#D1784F` | The warm signal: small dots, rules, underlines, focus on dark |
| `clay-deep` | `#9B4A28` | Clay as text and focus ring on light backgrounds |

Use the palette unevenly. Ivory and forest do almost all the work, sage only appears on dark, and clay is a seasoning: a dot before a label, a hover underline, an arrow. It never fills a large area except the clearly decorative "call to action" blocks inside concept artwork.

Contrast was checked against WCAG AA for every text pairing in use. Muted text passes on ivory, paper, and stone. `clay-deep` passes on all three light surfaces. Focus rings use `clay-deep` on light backgrounds and `clay` inside `bg-forest` or `bg-charcoal`, both above 3:1.

## Typography

**Fraunces** (variable, with optical sizing and italics) for headings, and **Hanken Grotesk** for everything else. Both are self-hosted by `next/font`.

Sizes are fluid utility classes in `globals.css`, so components never set heading sizes by hand:

| Class | Size | Use |
|---|---|---|
| `type-display` | 48px to 116px | Homepage headline only |
| `type-h1` | 40px to 76px | Page titles, closing calls to action |
| `type-h2` | 34px to 56px | Section headings |
| `type-h3` | 24px to 32px | Row and card headings |
| `type-lead` | 18px to 21px | Supporting paragraph under a heading |
| `type-quote` | 26px to 40px | Testimonials |
| `label` | 12px uppercase, tracked | Eyebrows, meta lines, column titles |

Wrap words in asterisks in a CMS heading to set them in the display italic, for example `Your next customer is *already looking.*` On light backgrounds the italic is moss, and on dark it is sage. Use one accent per heading at most.

`prose-lead` sets the first paragraph of rich text in the display face at a larger size. It is used for the service, industry, and introduction overviews.

## The growth rings

`Rings` (`components/ui/Rings.js`) draws irregular concentric contours, like a tree's annual rings, from a seed. The same seed always draws the same rings, on the server and in the browser, so there is no hydration mismatch and no image to download. With `animated`, the rings draw themselves once on load.

Use rings sparingly and quietly, at 10 to 25 percent opacity: the hero graphic, the consultation section, closing calls to action, the footer, the mega menu panel, and behind concept artwork. Never put them behind body text at a strength that hurts reading.

## Layout

- Container: 1360px maximum, with 20px, 32px, and 48px side gutters
- A 12-column grid at `lg` (1024px). Most sections split 4/8, 5/7, or 7/5 rather than halves, and long content holds its heading in a sticky left column.
- Section spacing: 96px on mobile, 128px to 144px on desktop
- Every responsive grid starts as `grid-cols-1` (a `minmax(0, 1fr)` track), so long content can never push a mobile column wider than the screen
- Backgrounds follow content, not a fixed rhythm: ivory by default, forest for the problem statement, process on service pages, and the consultation, and stone for supporting sections such as the homepage process and principles
- Radii are small (4px and 6px). There are no drop shadows except on the hero's interface fragments and the cookie notice.

## Components

| Component | Location | Notes |
|---|---|---|
| `Button`, `TextLink` | `components/ui/Button.js` | `primary`, `outline`, and for dark sections `light` and `ghost`. `TextLink` is the quiet secondary action. |
| `SectionHeading`, `Heading`, `Eyebrow` | `components/ui/` | `Eyebrow` shows a clay dot, or a number when given `index` |
| `Highlight` | `components/ui/` | Renders starred heading words in italic |
| `Rings` | `components/ui/` | The signature motif. `ringPaths` is also used by the social share image. |
| `CoverArt`, `artKind` | `components/ui/` | Original drawings of deliverables: website, landing page, roadmap, campaign, content calendar, and brand sheet. `artKind` picks the drawing from a project's services, most specific first. Used whenever a record has no uploaded image. |
| `ServiceRow` | `components/services/` | One numbered row of the services index, used on the homepage, services page, industries, and related services |
| `NumberedList`, `SideLabel` | `components/services/Ledger.js` | Ruled numbered lists and sticky left labels for detail pages |
| `ProjectCard`, `ProjectGrid`, `ProjectVisual` | `components/portfolio/` | Work cards in an alternating wide and narrow grid. Concept work carries a **Concept** label. |
| `PostCard`, `PostRow` | `components/blog/` | `featured` leads the blog index; `PostRow` is the text-only index on the homepage |
| `HeroJourney` | `components/home/` | The homepage graphic, described below |
| `HeroShell`, `HeroTitle`, `PageHero` | `components/home/PageHero.js` | Inner-page header: breadcrumbs, title, and lead set to the right |
| `ConsultationPanel` | `components/home/` | Forest section with what happens next, beside the form |
| `CookieConsent` | `components/layout/` | Loads analytics only after consent. Renders nothing until an analytics ID is set. |
| `SectionRenderer` | `components/sections/` | Maps CMS section types to components |

To add a section type: add it to `PageSection::TYPES` in Laravel, create the component, and register it in `SectionRenderer`.

## Homepage

The homepage follows a sales argument, one job per section, with one main action throughout: the free consultation.

1. **Hero:** the headline, a one-field quick start, and `HeroJourney`
2. **Introduction** (`intro`): who Evergrove is and what clients can expect
3. **The problem** (`statement`): on forest, with an animated diagram per problem
4. **Services** (`services_grid`): featured services as numbered editorial rows
5. **Selected work** (`portfolio_grid`): up to four projects in an asymmetric grid
6. **Process** (`process`): four stages beside a sticky heading
7. **Commitments** (`comparison`): the usual way, struck through, against how Evergrove works
8. **Testimonials**: hidden until one is approved
9. **Questions** and **Insights**
10. **Consultation form**

### Hero graphic

`HeroJourney` shows one customer's path from a search to an inquiry, drawn as three interface fragments: a search box, a search result, and an inquiry message. The words come from the hero section's items in the CMS (title is the stage, text is the fragment's content). The **Graphic label** field captions the panel, and **Graphic text** holds the honesty note, which should stay as "Illustration, not client data" or similar.

The quick start is a single website field. It scrolls to the consultation form and fills in the website, so the full form stays in one place. If the page has no form, it opens `/free-consultation`.

## Inner pages

Each template shares the system but has its own composition:

- **Service:** headline with category artwork and a "what you receive" list, overview with a sticky label, a fit ledger on stone, numbered deliverables, process on forest, benefits as large statements, related work, questions, related services, then the consultation form
- **Case study:** title and summary, a full-width visual, a facts strip, numbered chapters with sticky headings, a concept disclaimer where it applies, and a link to the next project
- **Services index:** one chapter per category, with the category name held beside its services
- **Blog:** the newest article leads, the rest follow in a grid, and articles have a sticky meta rail beside a 68-character reading column
- **Pricing:** plans on paper, with the recommended plan on forest and the plan's description saying who it suits

## Imagery

Pages use original graphics, so nothing depends on stock photos of people. Concept portfolio pieces have no photos at all: `CoverArt` draws their deliverable instead. When real project screenshots are uploaded, they replace the drawing automatically.

Only the blog has starter photos. They are CC0 stock images, listed with their sources in `backend/database/seeders/images/CREDITS.md`, and the people shown are stock models who must not be presented as staff or clients. Editors can replace them under **Posts**.

When real team or workplace photos exist, upload them to the About page's story section, or as the **Default page banner** in Site Settings. Inner page headers show that banner as a wide strip below the title. Use images at least 1920px wide.

## Motion

Animation guides the eye and never delays content.

- **Headline:** words rise in with CSS, so the largest text never waits on JavaScript
- **Growth rings:** the hero rings draw themselves once on load
- **Scroll entrances:** `Reveal` fades a block in, and `Stagger` brings list items in one after another. Neither runs above the fold.
- **Rows and links:** service and article rows shift slightly on hover while their arrow turns, and text links draw an underline
- **Problem diagrams:** `ProblemArt` animates a small diagram for each problem (`layers`, `chart-column`, or `gauge`). Other icons show a large icon instead.

Every animation respects the visitor's reduced-motion setting, in CSS and in Motion. Content stays visible without JavaScript.

## Accessibility

- One `h1` per page and a logical heading order
- A skip link, visible focus rings, labelled form controls, and inline validation messages tied to their fields
- Keyboard-operable menus. Escape closes them, and hover menus respond to the mouse only, so a tap on a touch screen opens them reliably.
- The mobile menu is rendered outside the header, because the header's backdrop blur would otherwise trap the fixed panel inside the bar
- Touch targets are at least 44px
