# Old Captain Guest House — website

Static site built with Eleventy, hosted on Netlify, edited through Decap CMS.
No PHP, no database, no plugins to update.

## For the owners: how to change something

Go to **https://oldcaptainskye.co.uk/admin/** and log in.

- **Rooms** — change a room's photo, extra photos, price, or description. Click the room, edit, then Publish.
- **Pages** — the home page text, the house photos, the Skye guide, contact, house rules, privacy.
- **Settings** — telephone, email, address, check-in times, and the booking link.

Changes appear on the site about a minute after you press Publish.

Photos: any size is fine. Every photo is resized automatically when the site
is built, so a large phone photo will not slow the site down. Landscape or
square works best.

## For a developer

    npm install
    npm run serve      # http://localhost:8080
    npm run build      # outputs to _site

Content lives in `src/rooms/*.md` and `src/*.md`; the home page, house page
and contact page text is in `src/_data/*.json` so the owners can edit it.
Site-wide details are in `src/_data/site.json`. Styles are in
`src/assets/site.css`.

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
