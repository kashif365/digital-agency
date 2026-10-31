# REST API

Base URL: `/api/v1`. All responses are JSON. Send `Accept: application/json`.

## Conventions

- Lists and records are wrapped in `data`. Paginated lists add `links` and `meta`.
- `{company}` in stored content is replaced with the business name in every public read response.
- Rich text fields contain HTML that was sanitized when saved.
- Errors: `404` not found, `422` validation (`errors` keyed by field), `429` rate limited.
- Public reads allow 600 requests per minute per IP.

## Public reads

| Method | Path | Notes |
|---|---|---|
| GET | `/services` | Published services, ordered by category. `?featured=1` returns homepage cards in homepage order. |
| GET | `/services/{slug}` | Full page content, FAQs, related services, and related work. |
| GET | `/industries` | Published industries. `has_page` says whether a detail page exists. |
| GET | `/industries/{slug}` | `404` when the industry has no page. |
| GET | `/pages/{slug}` | Page with its visible sections, in order. |
| GET | `/blog` | Paginated live posts. `?category={slug}`, `?page=`, `?per_page=` (max 24). |
| GET | `/blog-categories` | Categories that have live posts. |
| GET | `/blog/{slug}` | Post with related posts. Scheduled posts return `404` until their time. |
| GET | `/portfolio` | Real work, or illustrative samples if there is none. `meta.illustrative_only` says which. |
| GET | `/portfolio/{slug}` | `outcomes` is `null` unless verified. |
| GET | `/testimonials` | Approved testimonials only. |
| GET | `/faqs` | General FAQs. Service FAQs arrive with the service. |
| GET | `/settings/public` | Public settings only. Private settings are never included. |
| GET | `/sitemap` | Indexable paths with last-modified dates. |
| GET | `/redirects` | Active redirects. |

## Public forms

Both endpoints allow 5 requests per minute and 20 per hour per IP.

Spam protection applies to both. A filled honeypot, a submission under 3 seconds after the form rendered, more than 3 links, or an identical request within 10 minutes all return the normal `201` and store nothing, so bots learn nothing. Rejections are written to the security log.

### POST `/leads`

| Field | Rules |
|---|---|
| `full_name` | Required, 2 to 120 characters |
| `business_name` | Required, 2 to 160 characters |
| `email` | Required, valid email |
| `phone` | Required, 7 to 25 digits and phone punctuation |
| `website` | Optional. `https://` is added when no scheme is given. |
| `service_id` | Required, a published service |
| `budget` | Optional, one of the configured budget options |
| `message` | Required, 10 to 3000 characters |
| `source_page` | Optional, page path |
| `rendered_at` | Optional, epoch milliseconds when the form rendered |
| `company_fax` | Honeypot, must stay empty |

```json
{ "message": "Thank you. We have received your request..." }
```

Status `201`. The lead is stored and a queued email goes to the notification address.

### POST `/contact`

`name` (required), `email` (required), `phone`, `subject`, `message` (required), plus the spam fields above.

## Admin API

Protected by Sanctum bearer tokens, with role checks on every route. Tokens last 8 hours. The API does not use cookies, so it has no CSRF exposure. The Filament panel is a separate session-based app with its own CSRF protection.

| Method | Path | Permission |
|---|---|---|
| POST | `/admin/login` | Public. 5 attempts per minute per email and IP. |
| POST | `/admin/logout` | Authenticated |
| GET | `/admin/me` | Authenticated |
| GET | `/admin/dashboard` | `view leads` |
| GET | `/admin/leads` | `view leads`. Filters: `search`, `status`, `from`, `to`. |
| GET | `/admin/leads/export` | `export leads`. CSV, same filters. |
| GET | `/admin/leads/{id}` | `view leads`. Includes notes and submission history. |
| PATCH | `/admin/leads/{id}` | `manage leads`. Body: `status`. |
| POST | `/admin/leads/{id}/notes` | `manage leads`. Body: `body`. |

Lead statuses: `new`, `contacted`, `qualified`, `proposal_sent`, `won`, `lost`, `archived`.

Content, media, users, and settings are managed through the Filament panel at `/admin` rather than this API.

```bash
curl -X POST https://api.example.com/api/v1/admin/login \
  -H "Content-Type: application/json" -H "Accept: application/json" \
  -d '{"email":"you@example.com","password":"..."}'

curl https://api.example.com/api/v1/admin/leads?status=new \
  -H "Accept: application/json" -H "Authorization: Bearer <token>"
```
