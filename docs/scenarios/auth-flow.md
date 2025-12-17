# Scenario: Authenticate with API Key

## Context
Developers need to authenticate their SDK instance using an API Key to access protected resources.

## Scenario
1. **Given** a developer has a valid API Key "sk_live_12345"
2. **When** they initialize the client:
   ```typescript
   const client = createRAClient({
     auth: { apiKey: 'sk_live_12345' }
   });
   ```
3. **Then** the client should be successfully instantiated
4. **And** all subsequent outgoing requests should include the header:
   `Authorization: Bearer sk_live_12345`
5. **And** if the API Key is invalid, the API should return a 401 Unauthorized error (handled by `RAError`)
