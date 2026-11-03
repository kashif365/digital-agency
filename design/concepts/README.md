# Concept projects

Source files for Evergrove's concept portfolio. Each folder is a complete, responsive design for a **fictional** business, made to show the kind of work Evergrove produces. None of them is client work, and none of the businesses exists.

| Folder | Project | Services shown |
|---|---|---|
| `hartwell-kitchens/` | Local service website | Website design, local SEO |
| `northgate-dental-seo/` | Search audit and roadmap | SEO, technical SEO, local SEO |
| `fieldhouse-fitness/landing.html` | Campaign landing page | Landing page design, paid search |
| `fieldhouse-fitness/campaign.html` | Multi-channel campaign creatives | Paid search, paid social, email |
| `crumb-and-co/` | Social media content plan | Social media management, content |
| `morrow-coffee/` | Brand identity sheet | Branding and graphic design |

Photos inside the designs are CC0 stock, listed in `backend/database/seeders/images/ASSETS.md`.

## Updating a screenshot

1. Edit the HTML and open it in a browser to check it at desktop and phone widths.
2. Capture it at 1440px wide for desktop, and at 390px wide with a device pixel ratio of 2 for mobile.
3. Save the JPEG over the matching file in `backend/database/seeders/images/concepts/`.
4. Run `php artisan content:refresh --page=home --portfolio` to load it into the media library. Real client projects are never touched.

When real client work is approved for publication, add it as a case study in the admin. Concept projects disappear from the listing as soon as one real project is published.
