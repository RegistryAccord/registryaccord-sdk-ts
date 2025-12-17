# Content Service Requirements

## 1. Overview
Client for the core content registry, managing metadata, versions, and licensing.

## 2. OpenAPI Specification
- **Source**: `openapi/content/v1/openapi.yaml`
- **Generator**: `typescript-axios`
- **Output**: `src/generated/content`

## 3. Key Features
- **Registry**: Register and update content items.
- **Versioning**: Manage content versions and history.
- **Licensing**: Define and retrieve content licenses.

## 4. Specific Requirements
- **Scopes**: `content:read`, `content:write`
- **Models**: `ContentItem`, `ContentVersion`, `License`

## Version History
| Version | Date | Change Type | Description |
| :--- | :--- | :--- | :--- |
| 0.1.0 | 2025-12-04 | Initial | Extracted from monolithic requirements |
