# Terryhome

A Next.js App Router portfolio site.

## Commands

- `npm run dev` starts the development server.
- `npm run build` creates the production build.
- `npm start` serves the production build.
- `npm run lint` runs ESLint.

## Contact form configuration

Copy `.env.example` to `.env` and configure:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` — a sender address verified in Resend
- `CONTACT_TO_EMAIL` — the recipient address

The contact form posts to `/api/contact`; email credentials are only read by the server.

## Heroku Review Apps

`app.json` configures preview deployments through Heroku Review Apps. Enable Review Apps for the Heroku pipeline connected to this repository; Heroku's Node.js buildpack runs `npm run build` and the web process uses `npm start`.