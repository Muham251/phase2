# Phase III Spec: Natural Language Task Assistant

## 1. Objective:
Enable users to manage tasks via a conversational interface using LLM intent parsing.

## 2. Core Features:

*   **NL Task Creation:** Users can type 'Remind me to buy milk at 6pm' and the system should create a task with the correct title and due date.
*   **Chat Interface:** A sidebar or floating drawer component using Shadcn UI.

## 3. Technical Architecture:

*   **Frontend:** Create a ChatComponent that sends messages to a new backend endpoint.
*   **Backend:** Create POST /api/v1/ai/chat. This endpoint will use an LLM (OpenAI/Gemini) to convert text into a JSON object that matches our Task model.

## 4. Constraints:

*   No data is deleted via AI without a 'Confirm' button in the chat UI.
*   Use the existing AuthContext to ensure the AI only accesses the current user's tasks.

## Action Item:
After creating the spec and plan, implement the ChatComponent and the POST /api/v1/ai/chat backend route.