"use client";

import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import TaskList from "@/components/tasks/TaskList";
import TaskForm from "@/components/tasks/TaskForm";
import { Task } from "@/lib/types";
import { GradientButton } from "@/src/components/ui/gradient-button";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [refreshTasks, setRefreshTasks] = useState(false);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>;
  }

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleCreateTaskClick = () => {
    setSelectedTask(undefined);
    setShowTaskForm(true);
  };

  const handleEditTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleFormSuccess = () => {
    setShowTaskForm(false);
    setRefreshTasks(!refreshTasks);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background/80 backdrop-blur-sm border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-foreground">Welcome, {user.email}!</span>
              <ThemeToggle />
              <GradientButton onClick={handleLogout} variant="secondary" animate={true}>
                Logout
              </GradientButton>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-foreground">Your Tasks</h2>
          <GradientButton onClick={handleCreateTaskClick} variant="primary" animate={true}>
            Create Task
          </GradientButton>
        </div>

        {showTaskForm && (
          <div className="my-8">
            <TaskForm task={selectedTask} onSuccess={handleFormSuccess} />
          </div>
        )}

        <TaskList key={refreshTasks ? 'refresh' : 'no-refresh'} onEdit={handleEditTaskClick} />
      </main>
    </div>
  );
}
