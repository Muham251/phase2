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
  completed: any;
  updatedAt: string | number | Date;
  createdAt: string | number | Date;
  id: number;
  title: string;
  description: string;
  status: "pending" | "completed";
  due_date?: string;
  priority?: "low" | "medium" | "high";
  tags?: string[];
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  // Updated to match your provider's logic
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}