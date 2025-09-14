"use client";

import { useState, useEffect, useCallback } from "react";
import { Task, CreateTask, UpdateTask } from "../types";
import { taskStorage } from "../task-storage";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Load tasks on mount
  useEffect(() => {
    const loadedTasks = taskStorage.getTasks();
    setTasks(loadedTasks);
    setLoading(false);
  }, []);

  // Create a new task
  const createTask = useCallback((taskData: CreateTask): Task => {
    const newTask = taskStorage.createTask(taskData);
    setTasks(prev => [...prev, newTask]);
    return newTask;
  }, []);

  // Update an existing task
  const updateTask = useCallback((id: string, updates: UpdateTask): boolean => {
    const updatedTask = taskStorage.updateTask(id, updates);
    if (!updatedTask) return false;
    
    setTasks(prev => prev.map(task => 
      task.id === id ? updatedTask : task
    ));
    return true;
  }, []);

  // Delete a task
  const deleteTask = useCallback((id: string): boolean => {
    const success = taskStorage.deleteTask(id);
    if (!success) return false;
    
    setTasks(prev => prev.filter(task => task.id !== id));
    return true;
  }, []);

  // Toggle task completion
  const toggleTaskCompletion = useCallback((id: string): boolean => {
    const task = tasks.find(t => t.id === id);
    if (!task) return false;
    
    const newStatus = task.status === "Completed" ? "Todo" : "Completed";
    return updateTask(id, { status: newStatus });
  }, [tasks, updateTask]);

  // Get tasks by status
  const getTasksByStatus = useCallback((status: string) => {
    return tasks.filter(task => task.status === status);
  }, [tasks]);

  // Get tasks by priority
  const getTasksByPriority = useCallback((priority: string) => {
    return tasks.filter(task => task.priority === priority);
  }, [tasks]);

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    getTasksByStatus,
    getTasksByPriority,
  };
};
