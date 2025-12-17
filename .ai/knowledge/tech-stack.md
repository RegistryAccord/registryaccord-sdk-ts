# Tech Stack & Patterns

## Core Decisions
- **HTTP**: Axios (due to interceptor support).
- **Build**: TypeScript (Strict mode).
- **Testing**: Jest + MSW.

## Anti-Patterns
- Do not use `fetch` directly.
- Do not use class inheritance for models (use interfaces).

## Sync Logic
- This SDK is generated from `registryaccord-specs`.
- **Do not manually edit `src/generated/`**.
