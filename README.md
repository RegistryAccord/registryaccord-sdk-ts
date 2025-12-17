# RegistryAccord SDK for TypeScript

The official TypeScript SDK for the RegistryAccord protocol.

## Installation

```bash
# Install from GitHub Main Branch
npm install git+https://github.com/registryaccord/registryaccord-sdk-ts.git#main

# Or for local development (Monorepo style)
npm link
```

> **Note**: Authentication is currently Pre-Alpha. NPM publishing is paused.


## Quick Start

```typescript
import { createRAClient } from '@registryaccord/sdk';

const client = createRAClient({
  auth: {
    apiKey: 'your-api-key',
  },
});

async function main() {
  try {
    const response = await client.identity.identities.listIdentities();
    console.log(response.data.items);
  } catch (error) {
    console.error(error);
  }
}

main();
```

## Configuration

The `createRAClient` function accepts a configuration object with the following options:

| Option | Type | Default | Description |
|---|---|---|---|
| `baseURL` | `string` | `https://api.registryaccord.org` | The base URL of the API. |
| `timeout` | `number` | `10000` | Request timeout in milliseconds. |
| `auth.apiKey` | `string` | `undefined` | Your API key. |
| `auth.token` | `string` | `undefined` | Bearer token (for JWT auth). |
| `retry` | `boolean \| { maxRetries: number; baseDelay: number }` | `{ maxRetries: 3, baseDelay: 1000 }` | Retry configuration. Set to `false` to disable. |
| `headers` | `Record<string, string>` | `{}` | Custom headers to include in every request. |

## Features

- **Typed API**: Full TypeScript support for all RegistryAccord services.
- **Resilience**: Built-in rate limiting handling and exponential backoff retries.
- **Pagination**: Easy-to-use `CursorPaginator` for iterating over large datasets.
- **Error Handling**: Structured `RAError` classes based on RFC 7807.
- **Observability**: W3C Trace Context support.

## Services

The client exposes the following services:

- `client.identity`: Identity management (Users, Orgs, Consents)
- `client.content`: Content registry (Collections, Licenses)
- `client.storage`: Object storage (Buckets, Uploads)
- `client.payments`: Payments & Billing (Charges, Subscriptions)
- `client.feeds`: Data feeds & Signals
- `client.revenue`: Revenue sharing & Campaigns
- `client.analytics`: Event tracking & Metrics

## Examples

Check the `examples/` directory for more usage examples:

- [Basic Usage](examples/basic-usage.ts)
- [Pagination](examples/pagination.ts)
- [Error Handling](examples/error-handling.ts)
