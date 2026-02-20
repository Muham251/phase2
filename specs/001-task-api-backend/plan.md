# Plan: Spec-1 — Backend Core & Data Layer

**Project**: Todo Task API Backend
**Status**: DRAFT (Refactored)
**Author**: Senior Software Architect

---

## 1. Workflow & Quality Gates

This plan will be implemented following a strict, spec-driven agentic workflow. Before implementation begins, the following quality gates must be passed.

### 1.1. Constitution Check
- **[ ] Verified**: The plan and its referenced contracts adhere to all mandates in the project's `CLAUDE.md` constitution, including technology stack, security principles, and agent responsibilities.

### 1.2. Implementation Readiness
- **[ ] `spec.md` is Final**: The feature requirements are complete and stable.
- **[ ] `plan.md` is Final**: This architectural plan is approved.
- **[ ] `contracts/task-operations.yaml` is Final**: The OpenAPI contract is the authoritative source of truth for the API's public interface.
- **[ ] `tasks.md` is Generated**: The implementation work has been decomposed into a clear, sequential list of engineering tasks.

---

## 2. Scalable Architecture Overview

The backend will be a stateless API service built with **FastAPI**. The architecture will be organized into a scalable, feature-based project structure to support future growth.

### 2.1. Project Structure

```
/app
├── api/
│   └── v1/
│       ├── endpoints/
│       │   └── tasks.py      # Task-related API routes
│       └── api.py          # Main v1 API router
├── core/
│   ├── config.py         # Environment variable loading
│   └── deps.py           # FastAPI dependencies (e.g., get_session)
├── db/
│   └── models.py         # All SQLModel table and API schemas
├── main.py               # Main FastAPI app instantiation and startup logic
└── .env.example          # Environment variable template
```

### 2.2. Component Responsibilities

1.  **API Layer (`api/`)**: Defines API endpoints and handles request/response serialization. `tasks.py` will contain all logic related to the `/users/{user_id}/tasks` resource.
2.  **Core Layer (`core/`)**: Contains shared application logic, such as configuration management (`config.py`) and dependency injection setup (`deps.py`).
3.  **Database Layer (`db/`)**: Manages database session setup (in `deps.py`) and defines all data schemas (`models.py`) using SQLModel.
4.  **Main Application (`main.py`)**: Ties all the components together, mounts the main API router, and handles application-level events like startup.

---

## 3. API Contract Design

The API design is **authoritatively defined** in `specs/001-task-api-backend/contracts/task-operations.yaml`. This plan reflects that contract.

-   **Principle**: Contract-first. The OpenAPI specification is the source of truth.
-   **Base Path**: `/users/{user_id}/tasks`
-   **User Isolation**: Enforced at the path level. All operations on tasks are nested under the user who owns them.

### 3.1. Endpoints Summary

*   **`POST /users/{user_id}/tasks`**: Creates a new task for the specified user.
*   **`GET /users/{user_id}/tasks`**: Retrieves a list of all tasks for the specified user.
*   **`GET /users/{user_id}/tasks/{task_id}`**: Retrieves a single task, verifying ownership.
*   **`PATCH /users/{user_id}/tasks/{task_id}`**: Updates a single task, verifying ownership.
*   **`DELETE /users/{user_id}/tasks/{task_id}`**: Deletes a single task, verifying ownership.

---

## 4. Data Models (Database Schema)

The schema will be defined in `db/models.py` using **SQLModel**.

*   **Primary Keys**: `UUID`s with database-generated defaults (`gen_random_uuid()`).
*   **Timestamps**: `created_at` and `updated_at` fields, managed by the database server in UTC.

### Table: `User`
(As specified in `plan.md v1`)

| Column      | Type      | Constraints                               |
|-------------|-----------|-------------------------------------------|
| `id`        | `UUID`    | Primary Key, Default: `gen_random_uuid()` |
| `email`     | `str`     | Not Null, Unique, Indexed                 |
| `created_at`| `datetime`| Not Null, Server Default: `now()` at time zone 'utc' |
| `updated_at`| `datetime`| Not Null, Server Default: `now()` at time zone 'utc' |

### Table: `Task`
(As specified in `plan.md v1`)

| Column          | Type      | Constraints                               |
|-----------------|-----------|-------------------------------------------|
| `id`            | `UUID`    | Primary Key, Default: `gen_random_uuid()` |
| `title`         | `str`     | Not Null                                  |
| `is_completed`  | `bool`    | Not Null, Default: `False`                |
| `user_id`       | `UUID`    | Not Null, Foreign Key (`User.id`)         |
| `created_at`    | `datetime`| Not Null, Server Default: `now()` at time zone 'utc' |
| `updated_at`    | `datetime`| Not Null, Server Default: `now()` at time zone 'utc' |

---

## 5. Error-Handling and Validation Strategy

-   **Validation**: Handled automatically by FastAPI using the Pydantic schemas defined in `db/models.py`. Invalid request data will result in a `422 Unprocessable Entity` response.
-   **Client Errors**:
    -   `404 Not Found`: Returned manually when a resource is not found OR when a user attempts to access a resource they do not own. This is the primary mechanism for enforcing data isolation at runtime.
-   **Server Errors**:
    -   A global exception handler will be registered in `main.py` to catch any unhandled exceptions and return a generic `500 Internal Server Error` response.

---

## 6. Ownership & Security Rules

-   **Primary Rule**: Every database query that accesses a `Task` MUST be filtered by `task_id` (if applicable) AND `user_id`. The `user_id` MUST come from the URL path parameter, not the request body.
-   **404 over 403**: The API will consistently return `404 Not Found` if a task does not exist or if the requesting user is not the owner. This prevents resource enumeration.
-   **No Hard-coded Secrets**: The `DATABASE_URL` will be managed via a `.env` file, loaded by `core/config.py`. The `.env` file will be excluded from version control.
