# Phase III Plan: Natural Language Task Assistant

## 1. Architectural Alignment:
*   **Frontend:** Next.js 16+ using App Router, Shadcn UI for Chat Interface.
*   **Backend:** Python FastAPI, integrating with an LLM (OpenAI/Gemini).
*   **Authentication:** Existing Better Auth (JWT-enabled) will be leveraged for user isolation, as per `constitution.md`.

## 2. Backend Implementation (POST /api/v1/ai/chat):

### 2.1. Endpoint Definition
*   Create a new FastAPI endpoint `POST /api/v1/ai/chat` within `backend/src/api/routes/ai.py` (or a similar, appropriate location for AI-related routes).
*   The endpoint will accept a `message` string from the user.

### 2.2. Authentication & Authorization
*   Apply JWT authentication to the `POST /api/v1/ai/chat` endpoint using FastAPI's dependency injection system, similar to existing authenticated routes.
*   Extract the `user_id` from the validated JWT token. This `user_id` will be used for all subsequent operations to ensure user isolation, adhering to `constitution.md`'s security requirements.

### 2.3. LLM Integration
*   Integrate with an LLM provider (e.g., OpenAI, Gemini API). This will likely involve using a client library for the chosen LLM.
*   Define a clear prompt for the LLM that instructs it to convert natural language task requests into a structured JSON object. The JSON object should precisely match the structure of our `TaskCreate` Pydantic model (or a similar model tailored for LLM output). Key fields to extract will be `title`, `description`, `due_date`, `priority`, `tags`, and `status`. The `user_id` will be supplied internally from the JWT.
*   Implement a Pydantic model, e.g., `TaskLLMCreate`, to strictly validate the LLM's JSON output. This ensures data integrity before attempting to create a task in the database.

### 2.4. Task Creation Logic
*   Parse and validate the LLM's JSON output using the `TaskLLMCreate` Pydantic model.
*   Create a new task instance in the database using the `SQLModel` ORM. The `user_id` for this new task *must* be set to the `user_id` obtained from the authenticated JWT token, preventing cross-user data creation.
*   Return a `201 Created` HTTP response with the details of the newly created task.

### 2.5. Error Handling
*   Implement comprehensive error handling for:
    *   LLM API communication failures (e.g., network issues, API rate limits).
    *   LLM generating invalid or malformed JSON that does not conform to `TaskLLMCreate`.
    *   Database errors during task creation.
    *   Return appropriate HTTP status codes and error messages (e.g., 400 Bad Request, 500 Internal Server Error).

## 3. Frontend Implementation (ChatComponent):

### 3.1. Chat Interface Development
*   Create a new `ChatComponent` within `frontend/src/components/chat/ChatComponent.tsx`.
*   Utilize Shadcn UI components to build the chat interface. This will likely include `Dialog` or `Sheet` for the drawer/sidebar, `Input` for user messages, `Button` for sending, and `ScrollArea` for displaying messages.
*   Ensure the component is responsive and visually integrated with the existing frontend design.

### 3.2. User Input Handling
*   Implement an input field where users can type their natural language task requests.
*   Attach an event handler to the "Send" button (or Enter key) to capture the user's message.

### 3.3. API Client Integration
*   Develop a client-side function (e.g., `createAITask`) within `frontend/src/lib/api/ai.ts` to make `POST` requests to the `/api/v1/ai/chat` backend endpoint.
*   Ensure this API client automatically attaches the JWT token from the `AuthContext` to all requests, adhering to the project's authentication standards.

### 3.4. Displaying Chat History & Feedback
*   Manage local state within the `ChatComponent` to store and display the conversation history (user messages and AI responses).
*   Upon successful task creation via the AI endpoint, display a clear confirmation message to the user within the chat interface.
*   Consider mechanisms to update the main task list in the frontend to reflect the newly created task (e.g., triggering a re-fetch of tasks or optimistically updating local state).

### 3.5. "Confirm" for Deletion (Constraint Adherence)
*   **Initial Scope:** For this phase, focus on NL Task Creation.
*   **Future Consideration:** If LLM capabilities are expanded to include task deletion, a explicit user confirmation step (e.g., a "Confirm Deletion" button/dialog) will be strictly implemented in the UI before any deletion request is sent to the backend. This directly addresses the constraint: "No data is deleted via AI without a 'Confirm' button in the chat UI."

## 4. Testing:

### 4.1. Backend Unit/Integration Tests
*   Create new test files (e.g., `backend/tests/test_ai_chat.py`).
*   Write tests for the `POST /api/v1/ai/chat` endpoint covering:
    *   Successful task creation with valid natural language input.
    *   Edge cases for natural language parsing (e.g., missing due dates, ambiguous requests).
    *   Authentication failures (missing/invalid JWT).
    *   Authorization checks (ensuring `user_id` from JWT is used).
    *   LLM integration failures and error handling.
    *   Validation of LLM's JSON output.

### 4.2. Frontend End-to-End Tests
*   Extend existing Cypress or Playwright tests (if applicable) or create new ones for the frontend.
*   Verify the `ChatComponent` renders correctly.
*   Simulate user input and test the flow of sending a message to the backend.
*   Verify that a successful AI task creation updates the UI accordingly (e.g., new task appears in list).
*   Test error display in the UI for backend failures.

## 5. Deliverables:
*   `specs/004-ai-todo-chatbot/plan.md` (this document).
*   New or updated backend route definitions and logic (`backend/src/api/routes/ai.py`).
*   New backend Pydantic models for LLM output validation (`backend/src/schemas/ai.py`).
*   New frontend `ChatComponent` and associated styling and logic (`frontend/src/components/chat/ChatComponent.tsx`).
*   Frontend API client for AI chat (`frontend/src/lib/api/ai.ts`).
*   Comprehensive unit/integration tests for the backend.
*   End-to-end tests for the frontend.