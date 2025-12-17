# Integration Test Prompt

**Context**: Test the SDK against a real (or emulated) backend service.

**Workflow**:
1. **Setup**: Ensure the target service (e.g., Identity) is running locally or in staging.
2. **Config**: Create a test script using `RAClient` pointing to `http://localhost:PORT`.
3. **Scenario**: Implement a flow from `docs/scenarios/`.
4. **Validation**: Log request/response IDs for debugging.
