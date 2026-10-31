# Digital Marketing Agency Website

A lead-generation website for a digital marketing agency. A Next.js public site reads all of its content from a Laravel API, and a Filament admin panel manages that content, the leads, and the site settings.

| Part | Stack | Local URL |
|---|---|---|
| Public website | Next.js 16 (App Router), JavaScript, Tailwind CSS 4, Motion, React Hook Form, Zod | http://localhost:3000 |
| API | Laravel 13, MySQL 8, Sanctum, queues, notifications | http://127.0.0.1:8000/api/v1 |
| Admin panel | Filament 5 (Blade and Livewire), Spatie Permission | http://127.0.0.1:8000/admin |

Further documentation:

- [docs/API.md](docs/API.md): REST endpoints
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md): production setup and the launch checklist
- [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md): reference analysis, tokens, and components

## Run it locally

Requires PHP 8.3+, Composer, Node 20.9+, and MySQL 8. Laragon provides all of these, plus Mailpit for catching email.

**1. Backend**

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

In `.env`, set `ADMIN_SEED_EMAIL`, `ADMIN_SEED_PASSWORD`, and `FRONTEND_REVALIDATE_SECRET`. Then create a MySQL database named `digital_agency` and run:

```bash
php artisan migrate --seed
php artisan storage:link
php artisan serve --host=127.0.0.1 --port=8000
```

In a second terminal, start the queue worker. Lead emails and cache refreshes wait here until it runs.

```bash
php artisan queue:work
```

**2. Frontend**

```bash
cd frontend
npm install
cp .env.example .env.local
```

Set `REVALIDATE_SECRET` in `.env.local` to the same value as `FRONTEND_REVALIDATE_SECRET`. With the API running:

```bash
npm run dev
```

`npm run build` also needs the API running, because static pages are generated from it.

`php artisan serve` handles one request at a time, so local pages can feel slow while Next.js renders. Production PHP-FPM has no such limit. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

**Local email:** Laragon's Mailpit shows sent mail at http://127.0.0.1:8025.

## How content works

- **Everything editable lives in Laravel.** The frontend holds layouts, not copy. Pages are lists of typed sections that editors can reorder, hide, and rewrite under **Pages** in the admin.
- **`{company}` is a token.** Write it anywhere in content. The API replaces it with the name in Site Settings, so renaming the business is one change.
- **Edits appear within seconds.** Saving a record queues a refresh of the frontend cache. If that fails, pages refresh on their own within five minutes.
- **Blank means hidden.** Contact details, social icons, the utility bar, testimonials, and verified outcomes only render once real data exists. Empty sections never show placeholders.

### Guardrails against unverified claims

| Rule | How it is enforced |
|---|---|
| No unapproved testimonials | The API returns approved rows only. The section is hidden when there are none. |
| No unverified outcomes | Case study outcomes are withheld by the API until **Outcomes are verified** is on. |
| Illustrative work is labelled | Samples carry a public label and are `noindex`. They disappear once real work is published. |
| No invented ratings | No page emits rating structured data. |
| No invented contact details | Structured data and the UI omit any blank field. |

## Roles

| Role | Can do |
|---|---|
| `super_admin` | Everything |
| `admin` | Everything except manage super admins |
| `editor` | Content, blog, and media. No access to leads or settings. |
| `sales` | View, update, and export leads |

## Tests

```bash
cd backend && php artisan test     # In-memory SQLite, no setup needed
cd frontend && npx eslint .
```

## Layout

```
backend/    Laravel API and Filament admin
  app/Filament/          Admin resources, pages, widgets
  app/Http/              API controllers, requests, resources
  app/Services/          Spam guard, lead export, dashboard stats
  database/seeders/content/   Starter copy
frontend/   Next.js site
  app/                   Routes
  components/sections/   Section type to component mapping
  components/home/       Section components
  lib/                   API client, SEO, structured data, validation
docs/       API, deployment, design system
```
