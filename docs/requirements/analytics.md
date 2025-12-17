# Analytics Service Requirements

## 1. Overview
Client for ingesting events and retrieving metrics.

## 2. OpenAPI Specification
- **Source**: `openapi/analytics/v1/openapi.yaml`
- **Generator**: `typescript-axios`
- **Output**: `src/generated/analytics`

## 3. Key Features
- **Ingestion**: High-throughput event ingestion.
- **Metrics**: Query aggregated metrics.
- **Exports**: Data export jobs.

## 4. Specific Requirements
- **Scopes**: `analytics:read`, `analytics:write`
- **Models**: `Event`, `MetricQuery`, `ExportJob`

## Version History
| Version | Date | Change Type | Description |
| :--- | :--- | :--- | :--- |
| 0.1.0 | 2025-12-04 | Initial | Extracted from monolithic requirements |
