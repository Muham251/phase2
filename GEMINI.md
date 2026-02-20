# GEMINI.md: Project Context

## Directory Overview

This directory contains a framework for **Spec-Driven Development (SDD)**, a highly structured methodology for building software. It is not a traditional application but rather a "process-as-code" environment that uses an AI agent, guided by a series of prompts and scripts, to manage the development lifecycle.

The core philosophy is to break down development into a clear, sequential process:
1.  **Specification**: Define what the feature should do.
2.  **Planning**: Create a detailed architectural and implementation plan.
3.  **Tasking**: Break the plan into small, concrete, and testable tasks.
4.  **Implementation**: Write the code following the tasks, using a Test-Driven Development (TDD) approach.

The framework is built around automation (using PowerShell scripts) and comprehensive record-keeping to ensure every decision and action is documented.

## Key Files and Directories

*   `CLAUDE.md`: This file acts as the "constitution" for the AI agent. It defines the rules of engagement, core guarantees, development guidelines, and the step-by-step processes the agent must follow for tasks like planning, creating records, and suggesting architectural decisions.

*   `.specify/`: This is the engine room of the framework.
    *   `memory/constitution.md`: A template for defining the project's high-level architectural and coding principles. It sets the rules that all development must adhere to.
    *   `scripts/powershell/`: Contains the automation scripts that orchestrate the development workflow. The key script is `create-new-feature.ps1`.
    *   `templates/`: A collection of Markdown templates for all the documents generated during the development process, such as specs, plans, tasks, and architectural decision records (ADRs).

*   `.claude/commands/`: This directory contains the detailed, multi-step prompts that instruct the AI agent on how to execute its core commands (e.g., `/sp.plan`, `/sp.tasks`). These prompts guide the AI in analyzing user input and generating the required artifacts.

*   `specs/`: This directory is where the work for each feature lives. For each feature, a subdirectory is created (e.g., `specs/001-user-auth/`) which will contain the `spec.md`, `plan.md`, `tasks.md`, and other design documents.

*   `history/`: This directory is intended for storing the complete record of the development process.
    *   `prompts/`: Contains a full history of every interaction with the AI agent (Prompt History Records, or PHRs).
    *   `adr/`: Contains Architectural Decision Records, which document significant design choices.

## Usage / Development Workflow

The development process is highly structured and initiated via scripts. Here is the typical workflow for creating a new feature:

1.  **Initiate a New Feature**:
    To start work, run the `create-new-feature.ps1` script from the terminal with a description of your feature.
    ```powershell
    . .\.specify\scripts\powershell\create-new-feature.ps1 "A concise description of the new feature"
    ```
    This command will:
    *   Create a new git branch (e.g., `001-new-feature`).
    *   Create a new directory `specs/001-new-feature/`.
    *   Create a `spec.md` file inside it from a template.
    *   Create a `history/prompts/001-new-feature/` directory for record-keeping.

2.  **Define the Specification**:
    Flesh out the `specs/001-new-feature/spec.md` file. This document is where you define the feature's requirements, user stories, and acceptance criteria.

3.  **Generate the Implementation Plan**:
    Once the spec is complete, you would typically invoke the AI agent with a command like `/sp.plan`. The agent reads your `spec.md` and the project's `constitution.md` to produce a detailed `plan.md`, outlining the proposed architecture, project structure, and technical decisions.

4.  **Generate Tasks**:
    After the plan is reviewed and approved, you would run a command like `/sp.tasks`. The AI agent takes the `plan.md` and breaks it down into a series of small, actionable, and testable tasks, creating a `tasks.md` file.

5.  **Implement the Feature**:
    With the tasks defined, you can begin coding, following the `Red-Green-Refactor` cycle of Test-Driven Development for each task.
