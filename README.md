# Old Captain Guest House — website

Static site built with Eleventy, hosted on Netlify, edited through Decap CMS.
No PHP, no database, no plugins to update.

## For the owners: how to change something

Go to **https://oldcaptainskye.co.uk/admin/** and log in.

The site is in five languages: English, Spanish, French, German and Italian.
The editor has a **Rooms** and a **Pages** section for each language.

- **Rooms (English)**, **Rooms (Español)**, … — change a room's photo, extra photos, price, or description in that language. Click the room, edit, then Publish.
- **Pages (English)**, **Pages (Español)**, … — the home page text, the house photos, the Skye guide, contact, house rules, privacy, in that language.
- **Settings** — telephone, email, address, check-in times, and the booking link. These are shared by all languages.

If you change wording in English, make the same change in the other four
languages too, otherwise they will say something different. Photos are shared
between languages, so a photo changed in one language should be changed in the others.

Changes appear on the site about a minute after you press Publish.

Photos: any size is fine. Every photo is resized automatically when the site
is built, so a large phone photo will not slow the site down. Landscape or
square works best.

## Wording rules (from the owners, 15 Sep 2026)

- Breakfast is **complimentary** and self-service ("help yourself"), laid out
  from **7am**. Never "continental" (guests expect juice etc.) and never a
  served or cooked breakfast.
- Parking is **available on request**, never "free, on site" — space is tight
  when cars are parked badly.
- Room 5 is a **small double** and its private shower room is **next door in
  the corridor, not inside the room**. Say so wherever the room is described.
- Do not mention the garden or barbecue as a facility.

## For a developer

    npm install
    npm run serve      # http://localhost:8080
    npm run build      # outputs to _site

Languages: English is at the site root (`src/`), the other four are in
`src/es/`, `src/fr/`, `src/de/` and `src/it/` at `/es/…`, `/fr/…` and so on.
Each language folder has a `<lang>.11tydata.json` that sets `lang`; the root
has `src/src.11tydata.json` with `lang: en`. Every translatable string lives in
`src/_data/i18n/<lang>/` — `ui.json` (menus, buttons, form labels, footer,
room-page labels), `home.json`, `house.json`, `contact.json` and
`reviews.json`. `src/_data/eleventyComputed.js` exposes the current language's
bundle as `T`, plus `langPrefix` (`""` for English, `/es` etc.). The page
templates in `src/_includes/pages/` are shared by all languages; the per-language
files (`src/<lang>/index.njk` and friends) only set the permalink and include
them. Rooms are `src/rooms/*.md` (English) and `src/<lang>/rooms/*.md`, with a
collection `rooms_<lang>` each. The long pages (`skye`, `getting-here`, `terms`,
`privacy`, `whole-house`) are full Markdown files per language.
`base.njk` writes `hreflang` alternates and the language switcher. Old
WordPress URLs, including the translated ones, are mapped in `src/_redirects`.

Site-wide details are in `src/_data/site.json` (including the `languages`
list). Styles are in `src/assets/site.css`; bump the `?v=` on the stylesheet
link in `base.njk` whenever the CSS changes, so phones do not keep the old copy.

Images: `src/uploads/` holds the originals. At build time `@11ty/eleventy-img`
rewrites every `<img>` to resized WebP copies in `/img/` (480, 900 and 1600px)
so uploads of any size are served small. Do not put `width`/`height`
attributes on `<img>` tags in templates — a `width` attribute pins the output
to that single size.

Deploy only this folder. The mockups, the full-site preview and
`old-site-assets/` in the parent folder must not go into the repository.

## Setting up hosting (one time)

1. Push this repository to GitHub.
2. In Netlify: Add new site → Import from GitHub. Build command `npm run build`,
   publish directory `_site`. `netlify.toml` sets these already.
3. Netlify → Identity: enable it, enable Git Gateway, set registration to
   **Invite only**, then invite the owners' email addresses.
4. Point the domain. The DNS zone is at **Hosting UK** (GoDaddy only holds the
   registration), so add the records Netlify gives you in the Hosting UK
   control panel: an A record for `oldcaptainskye.co.uk` and a CNAME for `www`.
   **Do not touch the MX records** — they point at Hosting UK and carry the
   guest house's email.

## Still to do before launch

- [ ] Set `bookingUrl` in Settings to the real booking engine address
- [ ] Add the room rates (they are hidden while empty)
- [ ] Confirm the drive times on the Skye page with the owners
- [ ] Have the privacy page reviewed — it is a draft
- [x] Redirect the old WordPress URLs (`src/_redirects`)
- [ ] Submit the sitemap in Google Search Console

## Photo credits

Landscape photos on the Skye page and home page are from Unsplash (free licence,
no attribution required, but noted here): Portree from above by Johnny Briggs, the
Quiraing by Katja Nemec, Neist Point lighthouse by Vergil Cheynov. The Storr,
Fairy Pools and harbour photos came with the previous site.
