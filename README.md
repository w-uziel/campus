# Schoology

A student portal for courses, assignments, grades, materials, and planning.

This repository currently runs on demo data. Live account integration is not implemented.

## Development

Install the dependencies, then run `pnpm dev`. Run `pnpm build` for a production build and `pnpm test:branding` to check the browser-storage migration.

Saved demo progress migrates automatically from the previous browser-storage namespace when read.
