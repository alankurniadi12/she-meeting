Project overview

- This is an Express + Mongoose API using ES modules (`type: module` in package.json).
- Entry points: `src/server.js` (boot + DB connect) and `src/app.js` (Express app and routes).
- Main routes: `/auth` (auth.routes.js) and `/findings` (finding.routes.js).

Architecture & patterns

- Layers: `controllers` -> `services` -> `repositories` -> `models`.
  - Controllers are thin: accept `req, res, next` and forward errors to `next(error)`.
  - Services contain business logic and throw `AppError` for expected failures (see `src/utils/AppError.js`).
  - Repositories encapsulate direct Mongoose calls (e.g. `src/repositories/user.repository.js`).
  - Models are Mongoose schemas (see `src/models/*.js`); use schema `pre('save')` hooks for password hashing.

Error handling

- The app uses a centralized error middleware (`src/middlewares/error.middleware.js`).
- Services throw `AppError(message, statusCode)`; controllers catch and call `next(error)`.

Auth

- JWT-based: `src/middlewares/auth.middleware.js` expects `Authorization: Bearer <token>` and verifies using `process.env.JWT_SECRET`.
- Tokens are created by `src/utils/generate.token.js` and users are stored with hashed passwords via `src/utils/hash.js`.

Conventions to follow when contributing

- Keep controllers minimal — put logic in `services` and DB calls in `repositories`.
- Use async/await and propagate errors with `next(err)`; format expected failures with `AppError`.
- When adding a new route, add files in `routes/` and wire them in `src/app.js`.
- Follow model patterns: add schema, validation, and any `pre('save')` hooks in `models/`.

Dev & run notes

- ES module runtime: run node with `node src/server.js`. Ensure `.env` contains `PORT`, `MONGODB_URI`, and `JWT_SECRET`.
- There are no build or start scripts in `package.json` yet; useful quick commands:

```bash
# install deps
npm install

# run server (dev: consider using nodemon locally)
node src/server.js

# run quick schema test (example exists at src/test/testUserSchema.js)
node src/test/testUserSchema.js
```

Files to inspect when making changes

- Routing: `src/routes/*.routes.js`
- Controllers: `src/controllers/*.js` (e.g., `auth.controller.js`)
- Services: `src/services/*.js` (e.g., `auth.service.js`)
- Repositories: `src/repositories/*.js` (e.g., `user.repository.js`)
- Models: `src/models/*.js` (e.g., `user.model.js`)
- Middlewares: `src/middlewares/*.js` (auth and error handling are critical)
- Utils: `src/utils/*` (token, hash, AppError helpers)

Notes & gotchas discovered

- The project uses case-sensitive imports on a case-insensitive macOS FS; be careful when deploying to Linux (match filename casing exactly).
- `type: module` in `package.json` means use ESM import/export consistently.
- Some test/example files (e.g., `src/test/testUserSchema.js`) are simple examples — they require a running MongoDB and correct `.env` values.

If anything is unclear or you'd like more detail (examples for PR templates, commit message style, or automated scripts), tell me which area to expand.
