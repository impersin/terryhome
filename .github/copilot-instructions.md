# Terryhome Copilot Instructions

## Commands

- Install dependencies: `npm install`
- Run the production-style server: `npm start`
- Run the server with automatic restarts: `npm run dev`
- The server loads the root `.env` file through `dotenv` and listens on `PORT` when set, otherwise port `3000`. Shell-provided environment values take precedence over `.env`.
- There is currently no build command, lint command, or test suite. `npm test` is the npm scaffold placeholder and exits with an error, so there is no single-test command.

## Architecture

- This is a single-process Express application in `server/server.js` that serves everything under `client/` as static files and explicitly returns `client/index.html` for `/`.
- The site is a static, single-page portfolio. `client/index.html` owns the page structure, content, external resources, and the ordered `<script>` includes.
- Browser behavior is implemented as legacy global jQuery scripts in `client/js/`. `headerController.js` initializes navigation and slides; `custom.js` contains page interaction, animation, portfolio filtering, and lightbox initialization; `custom-lightbox.js` implements the portfolio modal.
- CSS and browser dependencies are committed assets under `client/css/` and `client/js/`; the page also loads some third-party resources from CDNs and portfolio media from S3.
- The only JSON API route is `POST /sendemail`. It currently delays and responds with `200`; its prior `sendmail` implementation is commented out. The matching contact form and map integrations in `index.html` are currently commented out, so changes to that route should be coordinated with re-enabling the client form.

## Repository Conventions

- Keep client asset paths relative to `client/`: Express exposes that directory at the web root, so `js/...`, `css/...`, and `images/...` URLs in `index.html` must not include `client/`.
- Preserve script load order in `client/index.html`. Feature scripts rely on globally loaded jQuery and plugins rather than module imports or a bundler.
- Page navigation and section behavior are coupled through IDs in `index.html` and `headerController.js`'s `stickUp` `parts` map. Add or rename sections in both places.
- Follow `.prettierrc` for maintained JavaScript: two-space indentation, single quotes, semicolons, and ES5-compatible trailing commas. The ESLint configuration permits browser and Node globals and uses the same core formatting rules, but ESLint is not installed or wired to an npm script.
- Avoid changing committed third-party/minified vendor files in `client/js/` and `client/css/` unless the dependency itself is intentionally being updated.
