PNPM := pnpm

.PHONY: install format format-check lint typecheck test build check

install:
	corepack enable
	$(PNPM) install --frozen-lockfile

format:
	$(PNPM) format

format-check:
	$(PNPM) format:check

lint:
	$(PNPM) lint

typecheck:
	$(PNPM) typecheck

test:
	$(PNPM) test

build:
	$(PNPM) build

check: format-check lint typecheck test build
