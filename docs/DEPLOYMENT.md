# Deployment

The two apps deploy separately. Laravel usually runs on an API subdomain, and Next.js on the main domain.

```
example.com        Next.js (Node 20.9+)
api.example.com    Laravel (PHP 8.3+ with PHP-FPM), MySQL 8, queue worker
```

## Laravel

Required PHP extensions: `pdo_mysql`, `mbstring`, `openssl`, `fileinfo`, `gd` (with WebP), `intl`, `zip`, `bcmath`.

### Environment

| Variable | Value |
|---|---|
| `APP_ENV` / `APP_DEBUG` | `production` / `false` |
| `APP_URL` | `https://api.example.com`. Media URLs are built from this. |
| `DB_*` | Production database credentials |
| `QUEUE_CONNECTION` | `database` (or `redis`) |
| `MAIL_*` | Your SMTP or transactional email provider |
| `MAIL_FROM_ADDRESS` | An address on a domain authorized to send |
| `FRONTEND_URL` | `https://example.com`. The only origin allowed by CORS. |
| `FRONTEND_REVALIDATE_SECRET` | A long random string, matching the frontend |
| `ADMIN_NOTIFICATION_EMAIL` | Fallback lead recipient |
| `ADMIN_SEED_EMAIL`, `ADMIN_SEED_PASSWORD` | First super admin. Remove from `.env` after seeding. |
| `SEED_COMPANY_NAME` | Client business name |
| `TRUSTED_PROXIES` | Load balancer IPs, or `*` if only reachable through one. Without this, rate limits treat all visitors as one IP. |

### Release steps

```bash
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan db:seed --force      # First release only
php artisan storage:link         # First release only
php artisan optimize
php artisan filament:optimize
php artisan queue:restart
```

Point the web root at `backend/public`. Keep the seeders out of later releases unless you intend to add missing records: they never overwrite existing rows.

### Queue worker

Lead emails and cache refreshes run on the queue, so the worker must stay up. If it stops, leads are still saved but emails wait.

```ini
; /etc/supervisor/conf.d/agency-worker.conf
[program:agency-worker]
command=php /var/www/backend/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
user=www-data
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/backend/storage/logs/worker.log
stopwaitsecs=3600
```

No cron job is required. Scheduled blog posts go live based on their publish time.

### PHP-FPM and OPcache

Enable OPcache. Laravel takes noticeably longer per request without it, and the website's render time depends on the API.

### Security log

Rejected form submissions and failed admin logins are written to `storage/logs/security-*.log`, kept for 90 days.

## Next.js

### Environment

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | `https://api.example.com`. Read at build time, so rebuild when it changes. |
| `NEXT_PUBLIC_SITE_URL` | `https://example.com`. Used for canonical links and the sitemap. |
| `API_INTERNAL_URL` | Optional private URL for server-side calls |
| `REVALIDATE_SECRET` | Same value as `FRONTEND_REVALIDATE_SECRET` |

### Release steps

The API must be reachable during the build.

```bash
npm ci
npm run build
npm run start     # Behind a process manager such as PM2 or systemd
```

Uploaded images are optimized from `/storage/**` on the API host. If you move media to another host such as S3, add that host to `images.remotePatterns` in `next.config.mjs`.

Scheduled posts appear within five minutes of their publish time, because nothing triggers a refresh at that moment.

## Launch checklist

### Client content

- [ ] Set the company name, logo, tagline, and description in **Site Settings**
- [ ] Add the phone, email, address, and social profiles
- [ ] Set the **Lead notification email**
- [ ] Review all starter copy: services, industries, FAQs, About page, and blog articles
- [ ] Have a legal adviser review the Privacy Policy and Terms & Conditions, which are general drafts
- [ ] Confirm which industries the business targets. Unpublish the rest, or turn off their pages.
- [ ] Replace the illustrative samples with approved case studies, or keep them labelled
- [ ] Add client-approved testimonials, or leave the section hidden
- [ ] Replace the starter stock photos with real, higher-resolution imagery, and add a default social sharing image
- [ ] Review the budget options and their currency in **Site Settings > Forms**

### Technical

- [ ] `APP_DEBUG=false` and a strong, unique super admin password
- [ ] HTTPS on both domains
- [ ] Send a test lead and confirm the email arrives
- [ ] Confirm the queue worker survives a server restart
- [ ] Database and `storage/app/public` backups are scheduled
- [ ] Add the analytics IDs in **Site Settings > Analytics**. Add a cookie consent banner first if your visitors' region requires one, since the site does not include one.
- [ ] Submit `https://example.com/sitemap.xml` to Google Search Console
- [ ] Add redirects for any old URLs in **Administration > Redirects**
