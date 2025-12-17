# AGENTS.md
> **Universal AI Entry Point**

## 🗺️ Map
- **Requirements**: `docs/requirements/INDEX.md`
- **Specs**: `specs/openapi/` (Git Submodule pinned to tag)
- **Scenarios**: `docs/scenarios/`
- **Prompts**: `.ai/prompts/` (Use these for tasks)
- **Knowledge**: `.ai/knowledge/` (Design decisions)
- **Active Context**: `memory-bank/`

## 🔗 Dependencies
- **Upstream Specs**: `specs/` (Repository: `https://github.com/abhishek-kumar-phutane/registryaccord-specs`)
  - **Single Source of Truth**: We build against the pinned version in this submodule.

## 🔄 How to Upgrade Specs
1. `cd specs`
2. `git fetch --tags`
3. `git checkout tags/vX.Y.Z`
4. `cd ..`
5. `npm run generate`
6. `git add specs src/generated`
7. Commit: "chore: upgrade specs to vX.Y.Z"

## 🚀 Release Workflow
> **Current Status**: Pre-Alpha (No NPM Publish).

- **Testing**: Use `npm link` to test SDK changes against local services.
- **CI**: All PRs must pass `ci.yml` (Lint/Test/Build) before merging.

## 🤖 Standard Workflows
1. **New Feature**: Use `.ai/prompts/feature-dev.md`
2. **Testing**: Use `.ai/prompts/unit-test.md`
3. **Review**: Use `.ai/prompts/code-review.md`

## 🛠️ Extended Workflows
- **Fix a Bug**: Use `.ai/prompts/bug-fix.md` (Reproduction first!)
- **Cleanup**: Use `.ai/prompts/refactor.md`
- **Docs**: Use `.ai/prompts/update-docs.md`
- **Integration**: Use `.ai/prompts/integration-test.md`

## 🚨 Critical Rules
- Never edit `src/generated/`.
- Adhere strictly to requirements in `docs/requirements/`.
- Write tests *before* implementation (TDD).
