# Bug Fix Prompt

**Context**: Fix a reported issue in the SDK.

**Workflow**:
1. **Analyze**: Read the issue description and identify the failing component.
2. **Reproduction**: Write a **failing test case** in `tests/` that reproduces the bug.
3. **Fix**: Modify the code in `src/` to resolve the issue.
4. **Verify**: Ensure the new test passes and no regressions occurred (`npm test`).
5. **History**: Update `Version History` in the relevant `docs/requirements/` file with type "Fix".
