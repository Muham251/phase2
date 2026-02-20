"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";
import { Task } from "@/lib/types";
import { GradientButton } from "@/src/components/ui/gradient-button";

interface TaskListProps {
  onEdit: (task: Task) => void;
}

export default function TaskList({ onEdit }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await apiClient.getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await apiClient.deleteTask(String(id));
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading tasks...</div>;
  }

  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-background rounded-lg shadow-md border border-border/40"
            >
              <h3 className="text-lg font-bold text-foreground">{task.title}</h3>
              <p className="text-sm text-gray-500">{task.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {task.status}
                </span>
                <div className="flex space-x-2">
                  <GradientButton onClick={() => onEdit(task)} variant="secondary" animate={true}>
                    Edit
                  </GradientButton>
                  <GradientButton
                    onClick={() => handleDelete(task.id)}
                    variant="secondary"
                    animate={true}
                  >
                    Delete
                  </GradientButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
