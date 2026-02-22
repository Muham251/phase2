export interface SignUpFormValues {
  email: string;
  password: string;
}

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt?: string | number | Date; 
  updatedAt?: string | number | Date; 
}


export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean; 
  status?: "pending" | "completed";
  due_date?: string; 
  priority?: "low" | "medium" | "high";
  tags?: string[];
  createdAt?: string | number | Date;
  updatedAt?: string | number | Date;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}


interface AuthResponse {
  user?: User;
  access_token?: string;
  token?: string;
  expires_in?: number;
}