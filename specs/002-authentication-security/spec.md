# Spec: Authentication & Security for FastAPI Todo Application

## Objective

To secure the FastAPI backend API by implementing robust user authentication and JWT-based authorization, ensuring that task management operations are restricted to authenticated users and that users can only access their own tasks.

## Key Features

*   **User Registration:** `POST /api/v1/auth/register` for new user creation with hashed passwords.
*   **User Login:** `POST /api/v1/auth/token` for authenticating users and issuing JWT access tokens.
*   **User Profile Retrieval:** `GET /api/v1/auth/me` to fetch details of the currently authenticated user.
*   **JWT Management:** Secure generation, encoding, decoding, and validation of JWTs using `python-jose` and `BETTER_AUTH_SECRET`.
*   **Password Hashing:** Use `passlib[bcrypt]` for secure password storage.
*   **Configuration Management:** `pydantic-settings` to manage environment variables like `BETTER_AUTH_SECRET` and `ACCESS_TOKEN_EXPIRE_MINUTES`.
*   **Data Model Updates:**
    *   `User` model with `id` (UUID), `email`, `hashed_password`, and `is_active` fields.
    *   `Task` model updated with `user_id` foreign key to `User` (One-to-Many relationship).
*   **Security Logic:** Implementation of `get_current_user` and `verify_user_ownership` dependencies to protect routes, validate JWTs, and enforce strict user isolation (user_id in path must match authenticated user_id from JWT).
