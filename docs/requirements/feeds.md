# Feeds Service Requirements

## 1. Overview
Client for retrieving content feeds, signals, and managing rankers.

## 2. OpenAPI Specification
- **Source**: `openapi/feeds/v1/openapi.yaml`
- **Generator**: `typescript-axios`
- **Output**: `src/generated/feeds`

## 3. Key Features
- **Feed Queries**: Retrieve personalized or chronological feeds.
- **Signals**: Ingest user interaction signals.
- **Rankers**: Configure ranking algorithms.

## 4. Specific Requirements
- **Scopes**: `feeds:read`, `feeds:write`
- **Models**: `FeedRequest`, `FeedResponse`, `Signal`, `RankerConfig`

## Version History
| Version | Date | Change Type | Description |
| :--- | :--- | :--- | :--- |
| 0.1.0 | 2025-12-04 | Initial | Extracted from monolithic requirements |
