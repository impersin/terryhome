# Terryhome Copilot Instructions

## Commands

- Install dependencies: `npm install`
- Run the development server: `npm run dev`
- Create a production build: `npm run build`
- Serve the production build: `npm start`
- Run linting: `npm run lint`
- There is no automated test suite or single-test command.
- `app.json` configures Heroku Review App previews through the Node.js buildpack.

## Architecture

- The site uses the Next.js App Router. `app/layout.tsx` owns global metadata and styles, `app/page.tsx` renders the portfolio, and `components/portfolio-page.tsx` contains its client-side interactions.
- `app/api/contact/route.ts` validates contact submissions and sends email through Resend. It requires `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`; use `.env.example` as the non-secret configuration contract.
- Static assets are served from `public/`. The page retains S3-hosted portfolio media.
- Legacy Express and jQuery sources remain in `server/` and `client/` solely as a migration rollback reference; do not add new behavior to them.

## Repository Conventions

- Keep public asset URLs rooted at `/` (for example, `/resume/Resume_Fall2020.pdf`).
- The main page is intentionally a client component because navigation, the skill carousel, gallery modal, and contact form use React state. Keep the Resend API and its environment variables server-only.
- Page navigation relies on section IDs in `components/portfolio-page.tsx`; retain those IDs when changing the navigation.
- `app/globals.scss` composes the legacy base styles with the Sass files owned by `PortfolioPage` and `Section`. Preserve the cascade order when moving styles between these files.
- Preserve the legacy CSS-derived class names while maintaining visual compatibility. Do not add new behavior to the minified assets in `client/`; they are rollback-only.
