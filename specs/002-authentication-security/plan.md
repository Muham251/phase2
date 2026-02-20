f# Plan: Implementing Authentication & Security

## Task: Execute the plan for integrating JWT-based Authentication and Authorization into the FastAPI backend.

## Steps:

1.  **Install Necessary Libraries**:
    *   `passlib[bcrypt]` for password hashing.
    *   `python-jose[cryptography]` for JWT encoding/decoding.
2.  **Update `backend/requirements.txt`**:
    *   Add `python-jose[cryptography]`.
    *   Ensure `passlib[bcrypt]` is present.
3.  **Update `backend/src/core/config.py`**:
    *   (Already updated to use pydantic-settings). Ensure `BETTER_AUTH_SECRET` is loaded.
4.  **Create `backend/src/core/security.py`**:
    *   **Password Hashing**: Implement `verify_password(plain_password, hashed_password)` and `get_password_hash(password)` using `passlib.context.CryptContext` with `bcrypt`.
    *   **JWT Handling**:
        *   `ALGORITHM = "HS256"`.
        *   `ACCESS_TOKEN_EXPIRE_MINUTES`.
        *   `create_access_token(data: dict)`: Encodes a JWT token with `user_id` in payload.
        *   `decode_access_token(token: str)`: Decodes and validates a JWT token.
        *   Use `settings.BETTER_AUTH_SECRET` from `src/core/config.py`.
5.  **Update `backend/src/models/user.py`**:
    *   Add `hashed_password: str = Field(nullable=False, index=False)` field.
    *   (Consider adding `is_active: bool = Field(default=True)` for user management).
6.  **Create `backend/src/api/schemas/user.py`**:
    *   `UserBase(SQLModel)`: Base schema with `email`.
    *   `UserCreate(UserBase)`: For registration, adds `password: str`.
    *   `UserRead(UserBase)`: For reading user info, adds `id: UUID`.
    *   `UserLogin(SQLModel)`: For login, `email: str`, `password: str`.
    *   `Token(SQLModel)`: For JWT response, `access_token: str`, `token_type: str = "bearer"`.
    *   `TokenData(SQLModel)`: For JWT payload, `user_id: UUID`.
7.  **Create `backend/src/api/dependencies.py`**:
    *   `oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")`.
    *   `get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_session)) -> User`: Decodes JWT, fetches `user_id`, and retrieves `User` from DB. Raises `HTTPException` for invalid tokens or non-existent users.
    *   `get_current_active_user(current_user: User = Depends(get_current_user)) -> User`: Ensures user is active (if `is_active` added).
    *   `verify_user_ownership(path_user_id: UUID, current_user: User = Depends(get_current_active_user)) -> User`: Checks if `path_user_id` matches `current_user.id`.
8.  **Create `backend/src/api/routes/auth.py`**:
    *   `router = APIRouter(prefix="/auth", tags=["Authentication"])`.
    *   `@router.post("/register", response_model=UserRead)`: Handles user registration, hashes password, saves to DB.
    *   `@router.post("/login", response_model=Token)`: Authenticates user, generates JWT.
    *   `@router.get("/me", response_model=UserRead)`: Returns current user details using `get_current_user` dependency.
9.  **Update `backend/src/api/routes/__init__.py`**:
    *   Add `from . import auth`.
    *   `api_router.include_router(auth.router)`.
10. **Update `backend/src/api/routes/tasks.py`**:
    *   Modify all existing routes (`POST`, `GET`, etc.) to use `verify_user_ownership` dependency to ensure strict isolation and authentication. This means each task route will depend on `get_current_active_user` and `verify_user_ownership`.
11. **Update `backend/src/main.py`**:
    *   No direct changes if `api_router` already includes `auth.router`. (Confirm this)
12. **Alembic Migration**:
    *   Execute `alembic revision --autogenerate -m "add_auth_fields"` to generate a migration script for the `User` model changes (e.g., `hashed_password`).
    *   Run `alembic upgrade head` to apply the migration.
