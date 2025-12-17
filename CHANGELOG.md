# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-12-05

### Added
- **Core SDK**: Initial release of `@registryaccord/sdk` for TypeScript.
- **Services**: Full support for Identity, Content, Storage, Payments, Feeds, Revenue, and Analytics APIs.
- **Authentication**: Built-in support for API Key (`ApiKeyAuth`) and JWT (`TokenManager`).
- **Resilience**: Automatic retries with exponential backoff (`RetryHandler`) and rate limit handling (`RateLimiter`).
- **Pagination**: `CursorPaginator` for easy iteration over large datasets.
- **Error Handling**: RFC 7807 compliant error classes (`RAError`).
- **Observability**: W3C Trace Context injection.
- **Examples**: Runnable examples for basic usage, pagination, and error handling.
