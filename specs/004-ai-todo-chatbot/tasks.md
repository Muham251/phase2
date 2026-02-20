# Tasks for Phase III – Natural Language Task Assistant

## Category: Backend Implementation (POST /api/v1/ai/chat)

### 1. Endpoint Setup
*   **Task**: Create `backend/src/api/routes/ai.py`
    *   **Description**: Create a new Python file to house AI-related FastAPI routes.
    *   **Status**: Pending
*   **Task**: Define `POST /api/v1/ai/chat` endpoint
    *   **Description**: Implement the basic FastAPI endpoint in `backend/src/api/routes/ai.py` that accepts a `message` string (e.g., using a Pydantic model for the request body).
    *   **Status**: Pending
*   **Task**: Implement JWT Authentication for `POST /api/v1/ai/chat`
    *   **Description**: Apply JWT authentication using FastAPI dependencies (e.g., `Depends(get_current_user)`) to secure the AI chat endpoint. Ensure the `user_id` is correctly extracted from the validated token.
    *   **Status**: Pending

### 2. LLM Integration & Task Model Conversion
*   **Task**: Create `backend/src/schemas/ai.py`
    *   **Description**: Create a new Python file for Pydantic schemas specifically for AI features.
    *   **Status**: Pending
*   **Task**: Define `TaskLLMCreate` Pydantic model
    *   **Description**: In `backend/src/schemas/ai.py`, define a Pydantic model (`TaskLLMCreate`) that closely matches the structure of `TaskCreate` (from `task_schemas.py` or similar), including fields like `title`, `description` (optional), `due_date` (optional), `priority` (optional), `tags` (optional list of strings), and `status` (optional). This model will be used to validate the LLM's output.
    *   **Status**: Pending
*   **Task**: Integrate LLM client library
    *   **Description**: Install and configure an appropriate LLM client library (e.g., `openai` or `google-generativeai` for Gemini). This may involve setting up environment variables for API keys.
    *   **Status**: Pending
*   **Task**: Develop LLM prompt for JSON conversion
    *   **Description**: Craft a clear and effective prompt for the chosen LLM. This prompt should instruct the LLM to parse a natural language task request and respond with a JSON object that adheres to the `TaskLLMCreate` schema. Include examples for various task types (e.g., with dates, priorities, tags).
    *   **Status**: Pending
*   **Task**: Implement LLM call and output validation
    *   **Description**: Within the `POST /api/v1/ai/chat` endpoint, call the LLM with the user's message and the defined prompt. Parse the LLM's raw response, and strictly validate the extracted JSON against the `TaskLLMCreate` Pydantic model.
    *   **Status**: Pending

### 3. Task Creation & Error Handling
*   **Task**: Implement Task Creation Logic
    *   **Description**: Using the validated data from the LLM (which conforms to `TaskLLMCreate`), create a new `Task` instance in the database via the SQLModel ORM. Crucially, set the `user_id` for this new task from the authenticated JWT token, ensuring data isolation.
    *   **Status**: Pending
*   **Task**: Implement Backend Error Handling
    *   **Description**: Add comprehensive error handling for potential issues, including LLM API communication failures, LLM generating invalid or unparseable JSON, and database errors during task creation. Return appropriate HTTP status codes (e.g., 400, 401, 500) and informative error messages.
    *   **Status**: Pending

## Category: Frontend Implementation (ChatComponent)

### 4. Chat Interface Development
*   **Task**: Create `frontend/src/components/chat/ChatComponent.tsx`
    *   **Description**: Create the main React component file for the AI chat interface.
    *   **Status**: Pending
*   **Task**: Develop Chat Interface UI with Shadcn UI
    *   **Description**: Implement the visual chat interface. This should include:
        *   A toggle (button/icon) to open/close the chat sidebar/drawer.
        *   A `Dialog` or `Sheet` component for the chat container.
        *   An `Input` field for the user to type messages.
        *   A `Button` to send messages.
        *   A `ScrollArea` to display the conversation history.
        *   Ensure a responsive and visually integrated design.
    *   **Status**: Pending

### 5. Frontend API Integration
*   **Task**: Create `frontend/src/lib/api/ai.ts`
    *   **Description**: Create a new TypeScript file to house AI-related API client functions.
    *   **Status**: Pending
*   **Task**: Implement `createAITask` API client function
    *   **Description**: In `frontend/src/lib/api/ai.ts`, create an asynchronous function that takes a user message and sends a `POST` request to `/api/v1/ai/chat`. This function *must* automatically attach the JWT token from the existing `AuthContext` (or similar global authentication state) to the request headers.
    *   **Status**: Pending
*   **Task**: Implement User Input Handling
    *   **Description**: Connect the `ChatComponent`'s input field and send button to trigger the `createAITask` API client function with the user's message.
    *   **Status**: Pending

### 6. UI State & Feedback
*   **Task**: Implement Chat History & Feedback Display
    *   **Description**: Manage the local state within `ChatComponent` to store and display the chronological flow of user messages and AI responses. Provide clear visual feedback for pending API requests, success messages for task creation, and error alerts.
    *   **Status**: Pending
*   **Task**: Integrate Task List Update Mechanism
    *   **Description**: After a successful AI task creation (indicated by the backend response), implement a mechanism to either re-fetch the user's task list or optimistically update the relevant UI component to display the newly created task. This ensures the main task view is synchronized.
    *   **Status**: Pending

## Category: Testing

### 7. Backend Tests
*   **Task**: Create `backend/tests/test_ai_chat.py`
    *   **Description**: Create a new Python file dedicated to backend tests for the AI chat endpoint.
    *   **Status**: Pending
*   **Task**: Write Backend Unit/Integration Tests
    *   **Description**: Implement a comprehensive suite of tests for the `POST /api/v1/ai/chat` endpoint. This includes:
        *   Testing successful task creation with various valid natural language inputs.
        *   Testing edge cases for natural language parsing (e.g., messages without dates, only titles, messages with tags).
        *   Verifying correct JWT authentication and authorization (e.g., 401 for unauthenticated, correct `user_id` usage).
        *   Simulating and testing LLM integration failures and ensuring proper error handling.
        *   Validating the LLM's JSON output structure and content.
    *   **Status**: Pending

### 8. Frontend Tests
*   **Task**: Implement Frontend End-to-End Tests
    *   **Description**: Create or extend existing end-to-end tests (e.g., using Cypress or Playwright) to cover the `ChatComponent`'s functionality. This should include:
        *   Verifying the chat interface renders correctly and is accessible.
        *   Simulating user interaction (typing messages, sending).
        *   Asserting that API calls are made correctly with JWT tokens.
        *   Verifying that successful AI task creations are reflected in the UI (e.g., new task appearing in the main list, confirmation message in chat).
        *   Testing how the UI handles and displays backend errors from the AI endpoint.
    *   **Status**: Pending
