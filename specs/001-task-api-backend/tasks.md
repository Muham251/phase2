# Tasks: Spec-1 — Backend Core & Data Layer

**Project**: Todo Task API Backend
**Status**: GENERATED

---

## Phase 1: Project Setup & Configuration

- [ ] **T001** - Initialize the FastAPI project structure as defined in `plan.md`.
  - `backend/src/api/v1/endpoints/`
  - `backend/src/core/`
  - `backend/src/db/`
  - `backend/src/main.py`
- [ ] **T002** - Create the environment variable template `.env.example` in the `backend/` directory with `DATABASE_URL` and `BETTER_AUTH_SECRET` placeholders.
- [ ] **T003** - Implement the settings management in `backend/src/core/config.py` to load environment variables.

---

## Phase 2: Foundational Layer (Database & Core Dependencies)

- [ ] **T004** - Implement the database session dependency `get_session` in `backend/src/db/database.py`.
- [ ] **T005** - Define the `User` and `Task` SQLModel schemas in `backend/src/models/` (`user.py` and `task.py`).
- [ ] **T006** - Configure Alembic for database migrations and generate the initial migration to create the `User` and `Task` tables.
- [ ] **T007** - Implement the core authentication logic in `backend/src/core/security.py` including password hashing and JWT token creation.
- [ ] **T008** - Implement the authentication dependencies (`get_current_user`, `get_current_active_user`) in `backend/src/api/dependencies.py`.

---

## Phase 3: User Story 1 (Authentication Endpoints)

**Goal**: A user can register a new account and log in to receive a JWT token.

- [ ] **T009** [US1] - Implement the `POST /auth/register` endpoint in `backend/src/api/routes/auth.py`.
- [ ] **T010** [US1] - Implement the `POST /auth/login` endpoint in `backend/src/api/routes/auth.py`.
- [ ] **T011** [US1] - Implement the `GET /auth/me` protected endpoint in `backend/src/api/routes/auth.py` to test token authentication.

---

## Phase 4: User Story 2 (Task Management Endpoints)

**Goal**: An authenticated user can create, read, update, and delete their own tasks.

- [ ] **T012** [US2] - Implement the `POST /users/{user_id}/tasks` endpoint in `backend/src/api/routes/tasks.py`, ensuring user ownership is enforced.
- [ ] **T013** [US2] - Implement the `GET /users/{user_id}/tasks` endpoint in `backend/src/api/routes/tasks.py` to list tasks for the authenticated user.
- [ ] **T014** [US2] - Implement the `PATCH /users/{user_id}/tasks/{task_id}` endpoint in `backend/src/api/routes/tasks.py` for updating tasks.
- [ ] **T015** [US2] - Implement the `DELETE /users/{user_id}/tasks/{task_id}` endpoint in `backend/src/api/routes/tasks.py` for deleting tasks.

---

## Dependencies & Implementation Strategy

*   **Phase 1** must be completed first.
*   **Phase 2** can begin after Phase 1.
*   **Phase 3** (Authentication) is a prerequisite for **Phase 4** (Task Management).
*   The implementation should follow an MVP approach, focusing on getting the authentication and core task CRUD operations working first.