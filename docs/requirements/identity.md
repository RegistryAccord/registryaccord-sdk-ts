# Identity Service Requirements

## 1. Overview
Client for managing users, organizations, teams, and authentication profiles.

## 2. OpenAPI Specification
- **Source**: `openapi/identity/v1/openapi.yaml`
- **Generator**: `typescript-axios`
- **Output**: `src/generated/identity`

## 3. Key Features
- **User Management**: Create, update, delete users.
- **Organization Management**: Manage orgs and team membership.
- **Authentication**: OIDC/OAuth2 flows (future), API Key management.

## 4. Specific Requirements
- **Scopes**: `identity:read`, `identity:write`
- **Models**: `User`, `Organization`, `Team`, `ApiKey`

## Version History
| Version | Date | Change Type | Description |
| :--- | :--- | :--- | :--- |
| 0.1.0 | 2025-12-04 | Initial | Extracted from monolithic requirements |
