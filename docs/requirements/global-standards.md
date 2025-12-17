# Global SDK Standards

This document defines the cross-cutting requirements for the RegistryAccord TypeScript SDK.

## 1. API Versioning

### 1.1 Requirements
- **Header**: `RA-API-Version`
- **Default Version**: `2025-11-01`
- **Strategy**: Hybrid (Date-based API versioning, SemVer SDK versioning).

### 1.2 Implementation
- SDK MUST inject `RA-API-Version` header on every request.
- SDK MUST expose `client.apiVersion`.

## 2. Authentication

### 2.1 Supported Methods
1. **API Key**: `Authorization: Bearer <key>`
2. **JWT**: `Authorization: Bearer <token>` (with refresh logic)

### 2.2 Token Management
- **Refresh Threshold**: 60 seconds before expiry.
- **Storage**: In-memory by default, extensible interface.

## 3. Observability

### 3.1 W3C Trace Context
- **Headers**: `traceparent`, `tracestate`.
- **Correlation**: `X-Correlation-Id` (UUID v4).
- **Behavior**: Propagate existing context or generate new if missing.

## 4. Error Handling

### 4.1 RFC 7807 Problem Details
SDK MUST parse error responses into typed `RAError` objects:
```typescript
class RAError extends Error {
  type: string;
  status: number;
  title: string;
  detail?: string;
  instance?: string;
  correlationId?: string;
}
```

### 4.2 Standard Errors
- `AuthenticationError` (401)
- `AuthorizationError` (403)
- `NotFoundError` (404)
- `RateLimitError` (429)
- `ValidationError` (400, 422)
- `ServerError` (5xx)

## 5. Pagination

### 5.1 Cursor-Based
- **Params**: `limit`, `after`, `before`.
- **Response**: `data: T[]`, `pagination: { nextCursor, hasNextPage }`.

### 5.2 Async Iterator
SDK MUST provide `CursorPaginator<T>` implementing `AsyncIterable<T[]>` and `items()` helper.

## 6. Rate Limiting & Retries

### 6.1 Rate Limits
- Parse `X-RateLimit-*` headers.
- Handle 429 by waiting for `Retry-After` duration.

### 6.2 Retry Policy
- **Max Retries**: 3
- **Strategy**: Exponential backoff with jitter.
- **Retryable**: 429, 5xx, Network errors (idempotent only).

## Version History
| Version | Date | Change Type | Description |
| :--- | :--- | :--- | :--- |
| 0.1.0 | 2025-12-04 | Initial | Extracted from monolithic requirements |
| 0.2.0 | 2025-12-04 | Added | Implemented RFC 7807 Error Handling |
| 0.3.0 | 2025-12-04 | Added | Implemented ApiKeyAuth and TokenManager |
| 0.4.0 | 2025-12-04 | Added | Implemented CursorPaginator |
| 0.5.0 | 2025-12-04 | Added | Implemented RateLimiter, RetryHandler, and BaseClient |
| 0.6.0 | 2025-12-04 | Added | Implemented RAClient factory and exported services |
