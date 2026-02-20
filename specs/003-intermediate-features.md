# Feature Specification: Intermediate Task Features

**Feature Branch**: `003-intermediate-features`
**Status**: Draft

---

## 1. Overview

This specification extends the core `Task` functionality by introducing features for better organization and workflow management. It adds support for setting task priorities, categorizing tasks with tags, and provides advanced querying capabilities including filtering, searching, and sorting.

This builds upon `spec/001-backend-core-data-layer` and `spec/002-authentication-security`, assuming a secure, user-scoped environment.

---

## 2. User Stories

### User Story 1 - Prioritize a Task

As a user, I want to assign a priority level (Low, Medium, High) to my tasks, so I can easily identify and sort what is most important.

**Acceptance Scenarios**:
1.  **Given** I am creating a new task, **When** I provide a valid priority level (e.g., "High"), **Then** the task is saved with that priority.
2.  **Given** an existing task, **When** I update it with a new priority, **Then** the task's priority is updated accordingly.

### User Story 2 - Categorize a Task

As a user, I want to add one or more text tags (e.g., "work", "personal") to my tasks, so that I can group and filter related items.

**Acceptance Scenarios**:
1.  **Given** I am creating a new task, **When** I provide a list of tags, **Then** the task is saved with those tags.
2.  **Given** an existing task, **When** I modify its tags, **Then** the list of tags is replaced with the new list.

### User Story 3 - Find and Filter Tasks

As a user, I want to filter my task list to see only completed or incomplete tasks, and search for tasks containing a specific keyword, so I can quickly find what I'm looking for.

**Acceptance Scenarios**:
1.  **Given** I have a mix of complete and incomplete tasks, **When** I request tasks with `is_completed=true`, **Then** only completed tasks are returned.
2.  **Given** I have several tasks, **When** I search for the keyword "meeting", **Then** only tasks with "meeting" in the title or description are returned.

### User Story 4 - Sort Tasks

As a user, I want to sort my task list by due date or priority, so I can view my tasks in a more organized manner.

**Acceptance Scenarios**:
1.  **Given** I have tasks with different due dates, **When** I request to sort by `due_date` in ascending order, **Then** the tasks are returned with the nearest due dates first.
2.  **Given** I have tasks with different priorities, **When** I request to sort by `priority` in descending order, **Then** High priority tasks are returned first.

---

## 3. Requirements

### Functional Requirements

-   **FR-010**: The `Task` model MUST be extended to include fields for `priority`, `tags`, and an optional `due_date`.
-   **FR-011**: The system MUST define a `Priority` enum with three levels: `LOW`, `MEDIUM`, `HIGH`.
-   **FR-012**: The `tags` field MUST store a list of arbitrary string labels.
-   **FR-013**: The `GET /api/v1/users/{user_id}/tasks` endpoint MUST be enhanced to support filtering, searching, and sorting via query parameters.
-   **FR-014**: The `POST` and `PATCH` endpoints for tasks MUST be updated to allow setting and modifying the new fields.

### Key Entities & Data Models

-   **Priority (Enum)**: A new enumeration for task priority.
    -   `LOW`
    -   `MEDIUM`
    -   `HIGH`

-   **Task (Updated)**: The `Task` model with new fields.
    -   `id` (UUID, Primary Key)
    -   `title` (str, non-nullable)
    -   `description` (Optional[str])
    -   `is_completed` (bool, default: `False`)
    -   `created_at` (datetime, UTC)
    -   `updated_at` (datetime, UTC)
    -   `user_id` (UUID, Foreign Key to `User.id`)
    -   **`priority` (Priority, default: `MEDIUM`)**
    -   **`tags` (Optional[List[str]], default: `None`)**
    -   **`due_date` (Optional[datetime], default: `None`)**

### API Contract (Updated)

*   `GET /api/v1/users/{user_id}/tasks`: Get all tasks for a user with advanced querying.
    *   **Query Parameters**:
        *   `is_completed: Optional[bool] = None` - Filter by completion status.
        *   `search: Optional[str] = None` - Search for a keyword in `title` and `description`.
        *   `sort_by: Optional[str] = None` - Field to sort by. Allowed values: `due_date`, `priority`, `created_at`.
        *   `sort_order: Optional[str] = "asc"` - Sort direction. Allowed values: `asc`, `desc`.
    *   **Success Response**: `200 OK`, returns a sorted and filtered list of Task objects.

*   `POST /api/v1/users/{user_id}/tasks`: Create a new Task.
    *   **Request Body (Updated)**: `{ "title": "string", "description": "string" (optional), "priority": "MEDIUM" (optional), "tags": ["tag1", "tag2"] (optional), "due_date": "YYYY-MM-DDTHH:MM:SSZ" (optional) }`
    *   **Success Response**: `201 Created`, returns the created Task object.

*   `PATCH /api/v1/users/{user_id}/tasks/{task_id}`: Partially update a Task.
    *   **Request Body (Updated)**: Can include `title`, `description`, `is_completed`, `priority`, `tags`, or `due_date`.
    *   **Success Response**: `200 OK`, returns the updated Task object.

---

## 4. Out of Scope

-   Complex tag management (e.g., renaming or deleting tags across all tasks).
-   Advanced search syntax (e.g., boolean operators).

---

## 5. Success Criteria

-   **SC-006**: The `Task` model in the database schema reflects the new `priority`, `tags`, and `due_date` fields.
-   **SC-007**: API tests verify that tasks can be created and updated with priority, tags, and due date.
-   **SC-008**: API tests confirm that the `GET /tasks` endpoint correctly filters by `is_completed`.
-   **SC-009**: API tests confirm that the `GET /tasks` endpoint correctly returns searched tasks.
-   **SC-010**: API tests confirm that the `GET /tasks` endpoint correctly sorts results by `due_date` and `priority` in both ascending and descending order.
