# Tasks: Authentication & Security

This task list is generated from the `plan.md` to align with the required development process.

## Task Breakdown

- [X] **1. Install Libraries**: Install `passlib[bcrypt]` and `python-jose[cryptography]`.
- [X] **2. Update `requirements.txt`**: Add `python-jose[cryptography]` and `passlib[bcrypt]` to the requirements file.
- [X] **3. Configure Secrets**: Ensure `BETTER_AUTH_SECRET` is loaded via `pydantic-settings` in `backend/src/core/config.py`.
- [X] **4. Implement Security Logic**: Create `backend/src/core/security.py` with functions for password hashing (`hash_password`, `verify_password`) and JWT management (`create_access_token`, `decode_access_token`).
- [X] **5. Update User Data Model**: Add `hashed_password` and `is_active` fields to the `User` model in `backend/src/models/user.py`.
- [X] **6. Define User Schemas**: Create Pydantic/SQLModel schemas for user operations (`UserCreate`, `UserRead`, `UserLogin`, `Token`, `TokenData`) in `backend/src/api/schemas/user.py`.
- [X] **7. Create Security Dependencies**: Implement `get_current_user`, `get_current_active_user`, and `verify_user_ownership` in `backend/src/api/dependencies.py` to handle token decoding and user verification.
- [X] **8. Implement Authentication Routes**: Create `backend/src/api/routes/auth.py` with endpoints for `/register`, `/login`, and `/me`.
- [X] **9. Register Auth Router**: Include the authentication router in `backend/src/api/routes/__init__.py`.
- [X] **10. Secure Task Routes**: Update `backend/src/api/routes/tasks.py` to use the `verify_user_ownership` dependency, ensuring users can only access their own tasks.
- [X] **11. Verify Main Router**: Confirm that the main API router in `backend/src/main.py` correctly includes the authentication routes.
- [X] **12. Create Database Migration**: Generate and apply an Alembic migration to add the new fields to the `user` table.
