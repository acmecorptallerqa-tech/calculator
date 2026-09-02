# Architecture: Clean Architecture

## Layer Map
- `domain/`         → Entities, Value Objects, Domain Services, Repository Interfaces
- `application/`    → Use Cases, DTOs, Application Services
- `infrastructure/` → DB, LLM clients, HTTP clients, MCP servers, external APIs
- `interfaces/`     → Controllers, Route handlers, CLI, Agent entry points

## Dependency Rule (ABSOLUTE)
Dependencies must ONLY point inward:

  interfaces → application → domain
  infrastructure → application → domain

## What this means in practice
- `domain/` imports NOTHING from outside itself
- `application/` imports only from `domain/`
- `infrastructure/` implements interfaces defined in `domain/` or `application/`
- `interfaces/` orchestrates use cases, never contains business logic

## Forbidden patterns
- Never import infrastructure directly into domain or application
- Never put business logic in controllers or route handlers
- Never let a use case know which DB or LLM is being used
- Never use `any` as a shortcut around layer contracts

## Agent behavior
- Before creating a file, identify which layer it belongs to
- If a concept doesn't fit cleanly in one layer, ask before proceeding
- Prefer extending existing abstractions over creating new ones

<!-- chiron-memory:start -->
# Project memory (chiron-memory)

This project uses chiron-memory: `chiron-memory/` holds atomic knowledge items
(decisions, conventions, gotchas) that future sessions retrieve. The
`chiron-memory` skill defines the format.

- **Before working**: search the project memory — it may already have the
  answer. Use the memory MCP tools when available (`memory_search`,
  `memory_canonical`), else `chiron-memory search "<topic>"`. Always do
  this, even when the task seems obvious.
- **When you learn something** (a decision with its why, a gotcha, a
  convention): record it in its type's file under `chiron-memory/` right then,
  in the What · Why · Where · Learned format. Don't leave it for the end.
- **Before finishing**: if you touched behavior/architecture and recorded
  nothing, record what you learned. Validate with `chiron-memory check`
  when that CLI is installed.
- Never use `chiron-memory/` as a journal or changelog — durable, reusable
  knowledge only.
<!-- chiron-memory:end -->
