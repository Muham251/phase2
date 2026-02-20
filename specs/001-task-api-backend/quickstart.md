# Quickstart Guide: Todo Task API Backend

## Overview

This guide provides a step-by-step process to get the Todo Task API backend up and running on your local machine. This API allows you to manage tasks, with strict isolation ensuring each user can only access their own tasks.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Python 3.10+**: Download from [python.org](https://www.python.org/downloads/).
-   **Poetry** (Recommended Python package manager): Install by following instructions on [python-poetry.org](https://python-poetry.org/docs/#installation).
-   **Docker** (Optional, for local PostgreSQL if not using Neon): Download from [docker.com](https://www.docker.com/products/docker-desktop).
-   **A Neon account**: Sign up at [neon.tech](https://neon.tech/).

## Environment Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```
    (Replace `your-username/your-repo-name.git` with the actual repository URL)

2.  **Create a virtual environment**:
    ```bash
    python -m venv .venv
    ```

3.  **Activate the virtual environment**:
    -   **Windows (PowerShell)**:
        ```powershell
        .\.venv\Scripts\Activate.ps1
        ```
    -   **Windows (CMD)**:
        ```cmd
        .venv\scripts\activate.bat
        ```
    -   **macOS / Linux**:
        ```bash
        source .venv/bin/activate
        ```

## Dependency Installation

Install the required Python packages using pip:

```bash
pip install "fastapi[all]" sqlmodel python-dotenv "psycopg2-binary>=2.9.1"
```

## Environment Variables (.env)

The application uses environment variables for sensitive configuration, especially the database connection string.

1.  **Create a `.env` file**: Copy the provided `.env.example` file to `.env` in the root of your project:
    ```bash
    cp .env.example .env
    ```

2.  **Edit `.env`**: Open the newly created `.env` file and set your `DATABASE_URL`:
    ```
    DATABASE_URL="postgresql://youruser:yourpassword@ep-long-darkness-123456.us-east-2.aws.neon.tech/yourdb?sslmode=require"
    ```
    **Important**: Never commit your `.env` file to version control.

## Database Setup (Neon Serverless PostgreSQL)

1.  **Create a Neon Project**:
    *   Log in to your Neon account.
    *   Create a new project. Neon will provide you with a `DATABASE_URL` connection string. It typically looks like:
        `postgresql://[user]:[password]@[host]/[dbname]?sslmode=require`
    *   Ensure your database is accessible (e.g., from `All IPs` or your current IP address if restricted).

2.  **Update `.env`**: Paste the `DATABASE_URL` from Neon into your `.env` file:
    ```
    DATABASE_URL="postgresql://youruser:yourpassword@ep-long-darkness-123456.us-east-2.aws.neon.tech/yourdb?sslmode=require"
    ```
    **Important**: Never commit your `.env` file to version control.

## Running the FastAPI Server

1.  **Ensure your virtual environment is active.**
2.  **Run the server using Uvicorn**:
    ```bash
    uvicorn main:app --reload
    ```
    The API will now be running at `http://127.0.0.1:8000`. You can access the interactive API documentation (Swagger UI) at `http://127.0.0.1:8000/docs`.

## Verifying the API is Working

You can use `curl` or any API client (like Postman or Insomnia) to test the endpoints. Replace `{USER_ID}` with a generated UUID for testing (e.g., `uuidgen` on Linux/macOS, or an online UUID generator).

1.  **Create a User (implicitly needed for task creation)**:
    Since user management isn't explicitly part of this API's spec yet, you'll need to assume a `user_id`. Let's use a sample `user_id` for testing, e.g., `a1b2c3d4-e5f6-7890-1234-567890abcdef`.

2.  **Create a Task (`POST /users/{user_id}/tasks`)**:
    ```bash
    curl -X POST "http://127.0.0.1:8000/users/a1b2c3d4-e5f6-7890-1234-567890abcdef/tasks" \
         -H "Content-Type: application/json" \
         -d '{ "title": "Buy groceries", "description": "Milk, Eggs, Bread" }'
    ```
    Expected response: `201 Created` with the new task details. Note down the `task_id` from the response.

3.  **List Tasks for the User (`GET /users/{user_id}/tasks`)**:
    ```bash
    curl -X GET "http://127.0.0.1:8000/users/a1b2c3d4-e5f6-7890-1234-567890abcdef/tasks"
    ```
    Expected response: `200 OK` with a list containing your created task(s).

4.  **Get a Specific Task (`GET /users/{user_id}/tasks/{task_id}`)**:
    Replace `{TASK_ID}` with the ID you noted from the POST request.
    ```bash
    curl -X GET "http://127.0.0.1:8000/users/a1b2c3d4-e5f6-7890-1234-567890abcdef/tasks/YOUR_TASK_ID_HERE"
    ```
    Expected response: `200 OK` with the task details.

5.  **Try to Access Another User's Task (expect 404)**:
    Use a *different* `user_id` or `task_id` that doesn't belong to the `user_id` in the path.
    ```bash
    curl -X GET "http://127.0.0.1:8000/users/another-user-uuid/tasks/YOUR_TASK_ID_HERE"
    ```
    Expected response: `404 Not Found`.

This completes your local setup and basic verification!
