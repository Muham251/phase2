---
id: 002
title: Set Project Constitution
stage: general
date: 2026-01-10
surface: cli
model: Gemini
feature: project-setup
branch: master
user: muhammad faiz
command: /sp.constitution
labels: [project-setup, constitution]
links:
  spec: 
  ticket: 
  adr: 
  pr: 
files:
- .specify/memory/constitution.md
tests:

---

## Prompt

make /sp.constitution

Project: Phase II – AI-Native Full-Stack Todo Web Application

Core principles:

* Spec-driven development (spec → plan → tasks → implementation)
* Zero manual coding (all implementation via Claude Code)
* Security-first architecture (JWT-based auth, user isolation)
* Deterministic behavior (clear inputs, outputs, and invariants)
* Transparency of agent decisions (plans and iterations are reviewable)

Key standards:

* Every feature must be explicitly defined in a specification before planning
* All API behavior must be deterministic and documented
* Authentication and authorization must be enforced at every backend endpoint
* User identity must be derived exclusively from verified JWT tokens
* Data access must always be scoped to the authenticated user
* Frontend, backend, and database responsibilities must be clearly separated

Technology constraints:

* Frontend: Next.js 16+ using App Router
* Backend: Python FastAPI
* ORM: SQLModel
* Database: Neon Serverless PostgreSQL
* Authentication: Better Auth (JWT-enabled)
* Auth mechanism: JWT tokens with shared secret verification
* No additional frameworks or services unless explicitly specified

Security requirements:

* All API endpoints require a valid JWT token
* Requests without valid authentication return 401 Unauthorized
* JWT signature must be verified using a shared secret (`BETTER_AUTH_SECRET`)
* Task ownership must be enforced on every read/write operation
* Backend must never trust user-provided IDs without JWT validation
* Tokens must support expiration

API standards:

* RESTful endpoint design
* Clear request/response schemas
* Proper HTTP status codes (200, 201, 400, 401, 404, 500)
* Consistent URL structure and naming
* No side effects outside documented behavior

Frontend standards:

* Responsive UI (desktop and mobile)
* Clear authentication flows (signup, signin, session handling)
* All API requests must attach JWT token automatically
* Graceful handling of auth errors and loading states
* No direct database or auth logic in UI components

Database standards:

* Persistent storage for all user and task data
* Schema must support multi-user isolation
* Tasks must be associated with a single user
* No cross-user data leakage under any condition

Process constraints:

* Follow Agentic Dev Stack workflow strictly
* Each spec must produce:

  1. A clear, testable specification
  2. A generated implementation plan
  3. A decomposed task list
  4. Claude Code–generated implementation
* All assumptions must be made explicit in the spec
* Iterations and refinements must be documented

Success criteria:

* All five Basic Level features implemented as a web application
* Secure multi-user authentication fully operational
* Each user can only see and modify their own tasks
* Backend independently verifies user identity
* Frontend and backend operate as decoupled services
* Application runs end-to-end with persistent storage
* Project is fully reviewable based on specs, plans, and outputs

## Response snapshot

Okay, the constitution has been saved. What's next?

## Outcome

- ✅ Impact: The project constitution was saved to `.specify/memory/constitution.md`.
- 🧪 Tests: No tests were run.
- 📁 Files: `.specify/memory/constitution.md` was created/updated.
- 🔁 Next prompts: The user will provide the next instruction.
- 🧠 Reflection: This step establishes the guiding principles for the project.

## Evaluation notes (flywheel)

- Failure modes observed: {{FAILURE_MODES}}
- Graders run and results (PASS/FAIL): {{GRADER_RESULTS}}
- Prompt variant (if applicable): {{PROMPT_VARIANT_ID}}
- Next experiment (smallest change to try): {{NEXT_EXPERIMENT}}
