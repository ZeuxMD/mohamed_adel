# Mohamed Portfolio

Personal portfolio built with React, Vite, and React Three Fiber.

## Setup

```bash
pnpm install
pnpm dev
```

## Feedback Loop

```bash
make format
make format-check
make lint
make typecheck
make test
make build
make check
```

The machine-readable feedback-loop contract lives in `.agents/feedback-loop.yml`.
Formatting is intentionally scoped to the maintenance surface: docs, config, contract files, and architecture tests.

Guardian note: this repo now maps to the official `vite-react-ts-pnpm` and `vite-react-ts-pnpm-strict` templates, but it still adopts them in phases because the app remains JavaScript with `checkJs` rather than a full TypeScript scaffold.

## TODO

- [ ] improve responsive styling
- [ ] add an image in about me section
