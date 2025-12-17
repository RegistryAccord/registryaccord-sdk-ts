# RegistryAccord SDK Requirements

> **Package**: `@registryaccord/sdk`
> **Source Specs**: `registryaccord-specs` (OpenAPI 3.1)
> **License**: Apache-2.0

## 📚 Documentation Map

| Category | File | Description |
| :--- | :--- | :--- |
| **Standards** | [Global Standards](./global-standards.md) | Auth, Errors, Versioning, Pagination, Observability |
| **Services** | [Identity](./identity.md) | Users, Orgs, OAuth2 |
| **Services** | [Content](./content.md) | Registry, Metadata, Licenses |
| **Services** | [Storage](./storage.md) | Uploads, Downloads |
| **Services** | [Payments](./payments.md) | Subscriptions, Ledgers |
| **Services** | [Feeds](./feeds.md) | Algorithms, Signals |
| **Services** | [Revenue](./revenue.md) | Ads, Auctions |
| **Services** | [Analytics](./analytics.md) | Events, Metrics |

## 🏗️ Project Structure

```
registryaccord-sdk-ts/
├── src/
│   ├── generated/              # OpenAPI Generator output (DO NOT EDIT)
│   ├── client/                 # Unified client factory
│   ├── auth/                   # Authentication strategies
│   ├── middleware/             # Interceptors (Version, Trace, etc.)
│   ├── pagination/             # Cursor paginator
│   ├── errors/                 # RFC 7807 error handling
│   └── index.ts                # Public exports
├── tests/                      # Unit and Integration tests
└── docs/                       # Requirements and Scenarios
```

## 🧪 Testing Strategy

- **Unit Tests**: >90% coverage for hand-written code (middleware, auth, etc.).
- **Integration Tests**: Mocked API calls using MSW to verify client behavior.
- **E2E Tests**: Critical user flows.

## 🚀 CI/CD

- **Build**: `npm run build`
- **Test**: `npm run test`
- **Lint**: `npm run lint`
- **Generate**: `npm run generate` (Must match committed code)

## Version History
| Version | Date | Change Type | Description |
| :--- | :--- | :--- | :--- |
| 0.1.0 | 2025-12-04 | Initial | Ported from monolithic SDK_REQUIREMENTS.md |
| 0.7.0 | 2025-12-05 | Complete | Phase 4 Complete: Examples, Documentation, and Final Verification |
