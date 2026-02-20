# Feature Specification: Backend Core & Data Layer

**Feature Branch**: `001-backend-core-data-layer`
**Created**: 2026-01-18
**Status**: Draft
**Input**: User description: "I gave you the best but u didnt made my spec.md detailed and best omne please do it request"

---

## 1. Overview

This specification details the foundational backend service for the Todo application. The primary goal is to establish a robust, secure, and scalable data persistence layer using FastAPI, SQLModel, and Neon Serverless PostgreSQL. This service will manage `Task` items, ensuring all data is correctly associated with a `User`.

While authentication is not implemented in this spec, the entire data model and API design will be "auth-ready," with `user_id` scoping enforced on all database operations to ensure data isolation from day one.

---

## 2. User Stories & Journeys

### User Story 1 - Create a Task (Priority: P1)

As a developer consuming the API, I want to create a new `Task` item for a specific user, so that tasks can be saved persistently.

**Why this priority**: This is the most fundamental "write" operation and the entry point for adding data to the system.

**Independent Test**: Can be tested by sending a `POST` request to the `/tasks` endpoint with a valid payload and verifying that a new record is created in the database with the correct `user_id` and a `201 Created` status is returned.

**Acceptance Scenarios**:

1.  **Given** a valid `user_id` and a `Task` payload containing a `title`.
    **When** a `POST` request is made to `/tasks`.
    **Then** the system MUST create a new `Task` record in the database, associate it with the provided `user_id`, and return the created `Task` object with a `201 Created` status.

2.  **Given** a request payload that is missing the required `title` field.
    **When** a `POST` request is made to `/tasks`.
    **Then** the system MUST NOT create a record and MUST return a `422 Unprocessable Entity` error with a descriptive message.

---

### User Story 2 - Retrieve Tasks (Priority: P1)

As a developer, I want to retrieve all `Task` items belonging to a specific user, so that their tasks can be displayed.

**Why this priority**: This is the core "read" operation, essential for any client application to function.

**Independent Test**: Can be tested by sending a `GET` request to the `/tasks` endpoint with a `user_id` query parameter and verifying that only the tasks associated with that `user_id` are returned with a `200 OK` status.

**Acceptance Scenarios**:

1.  **Given** a `user_id` that has existing `Task` items in the database.
    **When** a `GET` request is made to `/tasks` with a `user_id` query parameter.
    **Then** the system MUST return a JSON array of `Task` objects belonging only to that user with a `200 OK` status.

2.  **Given** a `user_id` that has no `Task` items.
    **When** a `GET` request is made to `/tasks` with a `user_id` query parameter.
    **Then** the system MUST return an empty JSON array `[]` with a `200 OK` status.

---

### User Story 3 - Update a Task (Priority: P2)

As a developer, I want to update an existing `Task` item (e.g., mark it as complete or change its title), ensuring the change is only possible for the user who owns it.

**Why this priority**: Allows for task progression and modification, a key part of a todo application.

**Independent Test**: Can be tested by sending a `PATCH` request to `/tasks/{task_id}` with a valid `user_id` and payload, then verifying the database record is updated and the updated object is returned.

**Acceptance Scenarios**:

1.  **Given** a `user_id` and a `task_id` that belongs to that user.
    **When** a `PATCH` request is made to `/tasks/{task_id}` with a valid payload (e.g., `"is_completed": true`).
    **Then** the system MUST update the corresponding `Task` in the database and return the updated `Task` object with a `200 OK` status.

2.  **Given** a `user_id` and a `task_id` that does NOT belong to that user.
    **When** a `PATCH` request is made to `/tasks/{task_id}`.
    **Then** the system MUST NOT update the record and MUST return a `404 Not Found` error.

3.  **Given** a `task_id` that does not exist.
    **When** a `PATCH` request is made to `/tasks/{task_id}`.
    **Then** the system MUST return a `404 Not Found` error.

---

### User Story 4 - Delete a Task (Priority: P2)

As a developer, I want to delete a specific `Task` item, ensuring the user can only delete their own tasks.

**Why this priority**: Allows users to remove completed or unnecessary tasks.

**Independent Test**: Can be tested by sending a `DELETE` request to `/tasks/{task_id}` with a valid `user_id` and verifying the record is removed from the database.

**Acceptance Scenarios**:

1.  **Given** a `user_id` and a `task_id` that belongs to that user.
    **When** a `DELETE` request is made to `/tasks/{task_id}`.
    **Then** the system MUST delete the `Task` from the database and return a `204 No Content` status.

2.  **Given** a `user_id` and a `task_id` that does NOT belong to that user.
    **When** a `DELETE` request is made to `/tasks/{task_id}`.
    **Then** the system MUST NOT delete the record and MUST return a `404 Not Found` error.

3.  **Given** a `task_id` that does not exist.
    **When** a `DELETE` request is made to `/tasks/{task_id}`.
    **Then** the system MUST return a `404 Not Found` error.

---

## 3. Requirements

### Functional Requirements

-   **FR-001**: The system MUST provide API endpoints for Create, Read, Update, and Delete (CRUD) operations for `Task` items.
-   **FR-002**: All data MUST be persisted in a Neon Serverless PostgreSQL database, with credentials read from a `.env` file.
-   **FR-003**: The system MUST use **SQLModel** as the ORM for all database interactions and schema definitions.
-   **FR-004**: Every `Task` item MUST be associated with a `User` via a `user_id`.
-   **FR-005**: All API endpoints that read, update, or delete data MUST enforce user scoping. A `user_id` must be used to ensure users can only affect their own data.
-   **FR-006**: The API MUST adhere to standard RESTful principles and return correct HTTP status codes, using `FastAPI.HTTPException` for all errors.
-   **FR-007**: The API MUST be fully functional and testable without a frontend client.
-   **FR-008**: All timestamps MUST be timezone-aware and stored in UTC.
-   **FR-009**: The system MUST implement a global error handler to return a generic `500 Internal Server Error` for unexpected issues (e.g., database connection loss).

### Key Entities & Data Models

-   **User**: Represents a user of the application.
    -   `id` (UUID, Primary Key)
    -   `email` (str, unique, indexed)
    -   `created_at` (datetime, UTC)

-   **Task**: Represents a single task. It must be linked to a `User`.
    -   `id` (UUID, Primary Key)
    -   `title` (str, non-nullable)
    -   `is_completed` (bool, default: `False`)
    -   `created_at` (datetime, UTC)
    -   `updated_at` (datetime, UTC)
    -   `user_id` (UUID, Foreign Key to `User.id`)

### API Contract

*   `POST /tasks`: Create a new Task.
    *   **Request Body**: `{ "title": "string", "user_id": "string <UUID>" }`
    *   **Success Response**: `201 Created`, returns the created Task object.
    *   **Error Response**: `422 Unprocessable Entity`.
*   `GET /tasks`: Get all Tasks for a user.
    *   **Query Parameter**: `user_id` (string <UUID>, required)
    *   **Success Response**: `200 OK`, returns a list of Task objects.
*   `GET /tasks/{task_id}`: Get a single task by its ID.
    *   **Header/Query**: Must also receive `user_id` to verify ownership.
    *   **Success Response**: `200 OK`, returns the Task object.
    *   **Error Response**: `404 Not Found` (if task does not exist or does not belong to user).
*   `PATCH /tasks/{task_id}`: Partially update a Task.
    *   **Request Body**: `{ "title": "string" (optional), "is_completed": "boolean" (optional), "user_id": "string <UUID>" }`
    *   **Success Response**: `200 OK`, returns the updated Task object.
    *   **Error Response**: `404 Not Found`, `422 Unprocessable Entity`.
*   `DELETE /tasks/{task_id}`: Delete a Task.
    *   **Request Body**: `{ "user_id": "string <UUID>" }`
    *   **Success Response**: `204 No Content`.
    *   **Error Response**: `404 Not Found`.

---

## 4. Out of Scope

-   **User Authentication**: No JWT validation or user registration/login flows. The `user_id` will be passed directly in the request for this phase.
-   **Frontend UI**: No client-side implementation.
-   **Advanced Features**: No support for task priorities, due dates, tags, or attachments.

---

## 5. Success Criteria

### Measurable Outcomes

-   **SC-001**: All specified CRUD API endpoints are implemented and fully functional.
-   **SC-002**: Automated tests (e.g., using `pytest`) demonstrate 100% coverage for all acceptance criteria defined in the user stories.
-   **SC-003**: Data Isolation is verifiable: an API request for User A's tasks MUST NEVER return data owned by User B.
-   **SC-004**: All data is successfully persisted in the PostgreSQL database and remains intact across server restarts.
-   **SC-005**: The API documentation (e.g., OpenAPI/Swagger UI generated by FastAPI) accurately reflects the defined API contract.
