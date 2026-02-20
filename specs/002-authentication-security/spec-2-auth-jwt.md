# Spec-2: Authentication & Security for FastAPI Todo Application

## 1. Problem Statement

The current FastAPI Todo application operates without user authentication, allowing any client to access and modify all tasks. This presents significant security vulnerabilities, as tasks cannot be attributed to specific users, leading to a lack of privacy, data integrity issues, and an inability to implement personalized user experiences. The primary problem is the need to transition from an unauthenticated API to a secure system where users can create, view, update, and delete only their own tasks, thereby preventing unauthorized access and ensuring data ownership.

## 2. Technical Stack

To address the authentication and security requirements, the following technical components will be utilized:

*   **Security:** `passlib[bcrypt]` will be employed for robust password hashing. This ensures that user passwords are never stored in plain text, protecting against data breaches.
*   **Tokenization:** `python-jose` will be used for JSON Web Token (JWT) generation, encoding, and verification. JWTs will serve as the mechanism for stateless authentication after initial login.
*   **Configuration:** `pydantic-settings` will manage sensitive configuration variables, including `BETTER_AUTH_SECRET` (for JWT signing) and `ACCESS_TOKEN_EXPIRE_MINUTES` (for JWT expiration), loaded securely from `.env` files.

## 3. User Stories

The following user stories define the core authentication and security features from a user perspective:

*   **As a user, I want to create an account with an email and password** so that I can securely log in and manage my tasks.
*   **As a user, I want to log in with my credentials** to receive a JWT access token that grants me access to protected routes.
*   **As a user, I want my tasks to be private and accessible only by me** to ensure the security and integrity of my personal data.
*   **As a user, I want to be able to access my profile information** (e.g., my email) after logging in.

## 4. API Endpoints

The following API endpoints will be implemented to handle user authentication:

*   **`POST /api/v1/auth/register`**
    *   **Description:** Creates a new user account in the database.
    *   **Request Body:** Requires `email` and `password`.
    *   **Logic:** Hashes the provided password using `bcrypt` and stores the `User` with the `hashed_password`. Returns the newly created user's public details.

*   **`POST /api/v1/auth/token`**
    *   **Description:** An OAuth2-compatible endpoint for user login. Validates user credentials and issues a JWT access token.
    *   **Request Body:** Requires `username` (email) and `password` (typically via `OAuth2PasswordRequestForm`).
    *   **Logic:** Verifies the provided credentials against the stored hashed password. Upon successful validation, it generates and returns a JWT `access_token` (of type "bearer").

*   **`GET /api/v1/auth/me`**
    *   **Description:** Retrieves the profile information of the currently authenticated user.
    *   **Security:** Requires a valid JWT in the `Authorization: Bearer <token>` header.
    *   **Logic:** Uses a dependency to extract, decode, and validate the JWT, returning the user associated with the token.

## 5. Database Changes

The database schema will undergo the following modifications:

*   **Introduce a `User` model**: A `User` table will be created with a `UUID` primary key, `email` (unique), and a `hashed_password` field to store secure password hashes.
*   **Update the `Task` model**: The existing `Task` model will be updated to include a `user_id` field. This `user_id` will serve as a foreign key, linking each `Task` record to its owning `User` in a one-to-many relationship.

## 6. Security Logic

### 6.1. `get_current_user` Dependency

A core FastAPI dependency, `get_current_user`, will be implemented to enforce authentication across protected routes. This dependency will:

*   Extract the JWT from the `Authorization: Bearer <token>` header of incoming requests.
*   Decode and verify the JWT's signature and expiration using `python-jose` and the `BETTER_AUTH_SECRET`.
*   Extract the `sub` (subject) claim from the JWT payload, which will contain the `user_id`.
*   Retrieve the corresponding `User` object from the database using the extracted `user_id`.
*   Raise appropriate `HTTPException` (e.g., 401 Unauthorized) if the token is invalid, expired, malformed, or if the user does not exist.

### 6.2. JWT Payload Structure

The JWT access token will include the following essential claims:

*   **`sub`**: The subject claim, which will store the unique `user_id` (as a string representation of the UUID) of the authenticated user.
*   **`exp`**: The expiration timestamp, indicating when the token becomes invalid.

## 7. Environment Variables

The following sensitive configuration variables will be managed via `pydantic-settings` and loaded from the `.env` file:

*   **`BETTER_AUTH_SECRET`**: A strong, randomly generated string (at least 32 characters) used for signing and verifying the integrity of JWTs.
*   **`ACCESS_TOKEN_EXPIRE_MINUTES`**: An integer value defining the duration (in minutes) after which an issued JWT access token will expire.