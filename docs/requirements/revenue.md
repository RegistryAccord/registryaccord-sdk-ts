# Revenue Service Requirements

## 1. Overview
Client for managing advertising, auctions, and revenue reporting.

## 2. OpenAPI Specification
- **Source**: `openapi/revenue/v1/openapi.yaml`
- **Generator**: `typescript-axios`
- **Output**: `src/generated/revenue`

## 3. Key Features
- **Ads**: Manage ad inventory and line items.
- **Auctions**: Real-time bidding and auction logic.
- **Reports**: Revenue and performance reporting.

## 4. Specific Requirements
- **Scopes**: `revenue:read`, `revenue:write`
- **Models**: `AdUnit`, `LineItem`, `AuctionConfig`, `Report`

## Version History
| Version | Date | Change Type | Description |
| :--- | :--- | :--- | :--- |
| 0.1.0 | 2025-12-04 | Initial | Extracted from monolithic requirements |
