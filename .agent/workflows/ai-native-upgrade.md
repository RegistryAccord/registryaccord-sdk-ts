---
description: Upgrade repository to AI-Native standards (Directories, Prompts, Requirements)
---

# AI-Native Repository Upgrade Workflow

This workflow upgrades a repository to support autonomous AI development by establishing a standard structure for context, prompts, and requirements.

## Step 1: Create Directory Structure
// turbo
1. Create the necessary directories for AI context and documentation.
   ```bash
   mkdir -p .ai/prompts .ai/knowledge .cursor/rules .github docs/requirements docs/scenarios memory-bank
   ```

## Step 2: Initialize Context Files
2. Create the universal entry point `AGENTS.md`.
   ```markdown
   # AGENTS.md
   > **Universal AI Entry Point**

   ## 🗺️ Map
   - **Requirements**: `docs/requirements/INDEX.md`
   - **Scenarios**: `docs/scenarios/`
   - **Prompts**: `.ai/prompts/`
   - **Knowledge**: `.ai/knowledge/`
   - **Active Context**: `memory-bank/`

   ## 🚨 Critical Rules
   - Adhere strictly to requirements in `docs/requirements/`.
   - Write tests *before* implementation (TDD).
   ```

3. Create standard prompts.
   - Create `.ai/prompts/feature-dev.md`
   - Create `.ai/prompts/unit-test.md`
   - Create `.ai/prompts/code-review.md`

4. Create knowledge base.
   - Create `.ai/knowledge/tech-stack.md`

5. Create IDE-specific rules.
   - Create `.cursor/rules/requirements.mdc`

## Step 3: Initialize Memory Bank
6. Create `memory-bank/activeContext.md`.
   ```markdown
   # Active Context
   **Status**: AI-Native Structure Initialized
   ```

## Step 4: Refactor Requirements (Manual Step)
7. Move existing requirements to `docs/requirements/`.
   - If you have a monolithic `REQUIREMENTS.md`, split it into granular files in `docs/requirements/`.
   - Create `docs/requirements/INDEX.md` as the table of contents.

## Step 5: Add Scenarios (Manual Step)
8. Add BDD scenarios to `docs/scenarios/` to describe user flows.
