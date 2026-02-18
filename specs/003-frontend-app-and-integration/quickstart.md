# Quickstart Guide: Frontend Application & Full-Stack Integration

This guide provides instructions for setting up, running, and using the frontend application.

## Prerequisites

Before you begin, ensure you have the following installed:

*   Node.js (version 18 or higher)
*   npm or Yarn (npm is used in these instructions)

## Setup

1.  **Navigate to the Frontend Directory:**
    ```bash
    cd frontend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the `frontend` directory with the following content:
    ```
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
    ```
    *Note: Ensure your backend API is running and accessible at the specified URL. The default assumes the backend is running on `http://localhost:8000`.*

## Running the Application

1.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    The application will typically be accessible at `http://localhost:3000`.

## Usage

### User Authentication

1.  **Register:**
    *   Open your browser and navigate to `http://localhost:3000/register`.
    *   Fill in your email and a strong password.
    *   Click "Register". Upon successful registration, you will be redirected to the Dashboard.

2.  **Login:**
    *   If you are not already logged in, navigate to `http://localhost:3000/login`.
    *   Enter your registered email and password.
    *   Click "Login". Upon successful login, you will be redirected to the Dashboard.

3.  **Logout:**
    *   On the Dashboard page, click the "Logout" button in the header.
    *   You will be redirected to the Login page.

### Task Management

1.  **View Tasks:**
    *   After logging in, you will be on the Dashboard (`/dashboard`) which displays your list of tasks.
    *   If you have no tasks, a message will prompt you to create one.

2.  **Create New Task:**
    *   From the Dashboard, click the "Add New Task" button.
    *   You will be redirected to the task creation page (`/tasks/create`).
    *   Fill in the task details (Title, Description, Due Date, Priority, Tags).
    *   Click "Create Task". You will be redirected back to the Dashboard, and your new task will appear in the list.

3.  **Edit Task:**
    *   On the Dashboard, find the task you wish to edit and click the "Edit" link on its card.
    *   You will be redirected to the task edit page (`/tasks/[id]`).
    *   Modify the task details as needed.
    *   You can also change the task's status (Pending/Completed) on this page.
    *   Click "Save Task". You will be redirected back to the Dashboard with the updated task.

4.  **Delete Task:**
    *   On the task edit page (`/tasks/[id]`), click the "Delete Task" button.
    *   Confirm the deletion when prompted.
    *   You will be redirected back to the Dashboard, and the task will be removed.

5.  **Mark Task Complete/Pending:**
    *   On the Dashboard, each task card has a "Mark Completed" or "Mark Pending" button.
    *   Clicking this button will toggle the task's status directly from the dashboard.
```