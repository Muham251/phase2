// /**
//  * Utility functions to transform data between backend and frontend formats
//  */

// import { Task, User } from '../types';

// /**
//  * Transforms backend todo response to frontend Task type
//  */
// export const transformTodoToTask = (todo: any): Task => {
//   return {
//     id: todo.id,
//     title: todo.title,
//     description: todo.description,
//     completed: todo.completed,
//     userId: todo.user_id, // Map backend's user_id to frontend's userId
//     createdAt: todo.created_at,
//     updatedAt: todo.updated_at,
//     priority: todo.priority || 'medium', // Default priority if not provided
//     due_date: todo.due_date || todo.dueDate, // Handle different possible field names
//   };
// };

// /**
//  * Transforms backend user response to frontend User type
//  */
// export const transformUserToUserType = (user: any): User => {
//   return {
//     id: user.id,
//     email: user.email,
//     name: user.name,
//     createdAt: user.created_at,
//     updatedAt: user.updated_at,
//   };
// };

// /**
//  * Transforms an array of backend todos to frontend Task types
//  */
// export const transformTodosToTasks = (todos: any[]): Task[] => {
//   return todos.map(transformTodoToTask);
// };


/**
 * Utility functions to transform data between backend and frontend formats
 */import { Task, User } from '../types';

// Backend todo type (snake_case)
export type BackendTodo = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  user_id: number;
  status?: 'pending' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  due_date?: string;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
};

// Backend user type (snake_case)
export type BackendUser = {
  id: string;
  email: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
};

// Transform a single BackendTodo → Frontend Task (camelCase)
export const transformTodoToTask = (todo: BackendTodo): Task => ({
  id: todo.id,
  title: todo.title,
  description: todo.description ?? '',
  completed: todo.completed ?? false,
  userId: todo.user_id,       // user_id → userId
  status: todo.status ?? 'pending',
  priority: todo.priority ?? 'medium',
  dueDate: todo.due_date,     // due_date → dueDate
  tags: todo.tags ?? [],
  createdAt: todo.created_at, // created_at → createdAt
  updatedAt: todo.updated_at, // updated_at → updatedAt
});

// Transform a single BackendUser → Frontend User (camelCase)
export const transformUserToUserType = (user: BackendUser): User => ({
  id: user.id,
  email: user.email,
  name: user.name ?? '',
  createdAt: user.created_at,
  updatedAt: user.updated_at,
});

// Transform an array of BackendTodo → Frontend Tasks
export const transformTodosToTasks = (todos: BackendTodo[]): Task[] =>
  todos.map(transformTodoToTask);



