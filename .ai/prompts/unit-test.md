# Unit Test Generation Prompt

**Context**: Write Jest unit tests for `src/{TARGET_FILE}.ts`.

**Constraints**:
- Use `msw` for HTTP mocking.
- Follow the "Arrange-Act-Assert" pattern.
- Achieve >90% line coverage.
- Do not mock internal logic, only external dependencies (axios).
