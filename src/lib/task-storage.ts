import { Task, CreateTask, UpdateTask } from "./types";

const STORAGE_KEY = "ai-task-manager-tasks";

export const taskStorage = {
  // Get all tasks from localStorage
  getTasks: (): Task[] => {
    if (typeof window === "undefined") return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      return [];
    }
  },

  // Save tasks to localStorage
  saveTasks: (tasks: Task[]): void => {
    if (typeof window === "undefined") return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  },

  // Create a new task
  createTask: (taskData: CreateTask): Task => {
    const tasks = taskStorage.getTasks();
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedTasks = [...tasks, newTask];
    taskStorage.saveTasks(updatedTasks);
    return newTask;
  },

  // Update an existing task
  updateTask: (id: string, updates: UpdateTask): Task | null => {
    const tasks = taskStorage.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) return null;
    
    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    taskStorage.saveTasks(updatedTasks);
    
    return updatedTask;
  },

  // Delete a task
  deleteTask: (id: string): boolean => {
    const tasks = taskStorage.getTasks();
    const updatedTasks = tasks.filter(task => task.id !== id);
    
    if (updatedTasks.length === tasks.length) return false;
    
    taskStorage.saveTasks(updatedTasks);
    return true;
  },

  // Get a single task by ID
  getTask: (id: string): Task | null => {
    const tasks = taskStorage.getTasks();
    return tasks.find(task => task.id === id) || null;
  },
};
