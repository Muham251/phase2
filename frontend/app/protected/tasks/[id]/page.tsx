'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../../components/providers/auth-provider';
import { Task } from '../../../../lib/types';
import { apiClient } from '../../../../lib/api/client';

const TaskDetailPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  useAuth();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (!id) {
          setError('Task ID is missing');
          setLoading(false);
          return;
        }

        const response = await apiClient.getTaskById(id as string);
        setTask(response);
      } catch (err) {
        setError('Failed to load task');
        console.error('Error fetching task:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-xl" role="alert">
            <strong className="font-bold">Task not found! </strong>
            <span className="block sm:inline">The requested task does not exist.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Task Details</h1>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-xl shadow-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors"
          >
            Back to Tasks
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-slate-100">
          <div className="px-4 py-5 sm:px-6 border-b border-slate-100">
            <h3 className="text-lg leading-6 font-medium text-slate-900">{task.title}</h3>
            <p className="mt-1 max-w-2xl text-sm text-slate-500">Details and information about the task.</p>
          </div>
          <div>
            <dl>
              <div className="bg-slate-50/50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-slate-500">Title</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">{task.title}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-slate-500">Description</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">{task.description || 'No description provided'}</dd>
              </div>
              <div className="bg-slate-50/50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-slate-500">Status</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                   task.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                  {task.status === 'completed' ? 'Completed' : 'Pending'}
                  </span>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-slate-500">Priority</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    task.priority === 'high'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : task.priority === 'medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                  {task?.priority ? (task.priority.charAt(0).toUpperCase() + task.priority.slice(1)) : 'Normal'}
                  </span>
                </dd>
              </div>
              <div className="bg-slate-50/50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-slate-500">Due Date</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                  {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-slate-500">Created</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                  {new Date(task.createdAt).toLocaleString()}
                </dd>
              </div>
              <div className="bg-slate-50/50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-slate-500">Last Updated</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                  {new Date(task.updatedAt).toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
          <div className="px-4 py-4 bg-slate-50/50 sm:px-6 border-t border-slate-100">
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => router.push('/protected/tasks')}
                className="inline-flex items-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-xl shadow-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push(`/protected/tasks/edit/${id}`)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-md text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 transition-colors"
              >
                Edit Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
