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
}

export interface Task {
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
