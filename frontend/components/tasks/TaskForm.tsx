"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api/client";
import { Task } from "@/lib/types";
import { GradientButton } from "@/src/components/ui/gradient-button";

interface TaskFormProps {
  task?: Task;
  onSuccess: () => void;
}

export default function TaskForm({ task, onSuccess }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setPriority(task.priority || "medium");
      setDueDate(task.dueDate || "");
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const taskData = {
      title,
      description,
      priority,
       due_date: dueDate || undefined,
    };

    try {
      if (task) {
        await apiClient.updateTask(String(task.id), taskData);
      } else {
        await apiClient.createTask(taskData);
      }
      onSuccess();
    } catch (error) {
      console.error("Failed to save task", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg p-8 space-y-6 bg-background rounded-lg shadow-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-foreground">
        {task ? "Edit Task" : "Create Task"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="text-sm font-medium text-foreground">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
            className="w-full px-3 py-2 mt-1 text-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="text-sm font-medium text-foreground"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 mt-1 text-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label
            htmlFor="priority"
            className="text-sm font-medium text-foreground"
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "low" | "medium" | "high")
            }
            disabled={loading}
            className="w-full px-3 py-2 mt-1 text-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="dueDate" className="text-sm font-medium text-foreground">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 mt-1 text-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <GradientButton type="submit" variant="primary" animate={true} disabled={loading}>
          {loading ? "Saving..." : "Save Task"}
        </GradientButton>
      </form>
    </div>
  );
}
