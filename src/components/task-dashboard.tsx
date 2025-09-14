"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TaskForm } from "./task-form";
import { TaskList } from "./task-list";
import { useTasks } from "@/lib/hooks/use-tasks";
import { Plus, Filter, Search } from "lucide-react";

export function TaskDashboard() {
  const {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    getTasksByStatus,
  } = useTasks();

  const [filter, setFilter] = useState<"All" | "Todo" | "In Progress" | "Completed">("All");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Filter tasks based on selected filter
  const filteredTasks = filter === "All" 
    ? tasks 
    : getTasksByStatus(filter);

  // Sort tasks by priority and due date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // First by status (Todo > In Progress > Completed)
    const statusOrder = { "Todo": 0, "In Progress": 1, "Completed": 2 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;

    // Then by priority (High > Medium > Low)
    const priorityOrder = { "High": 0, "Medium": 1, "Low": 2 };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;

    // Finally by due date
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;

    return 0;
  });

  const handleCreateTask = (taskData: any) => {
    createTask(taskData);
    setIsCreateDialogOpen(false);
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = getTasksByStatus("Completed").length;
  const todoTasks = getTasksByStatus("Todo").length;
  const inProgressTasks = getTasksByStatus("In Progress").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <p className="text-gray-600 mt-1">Organize your tasks</p>
        </div>
        
        <TaskForm
          onSubmit={handleCreateTask}
          trigger={
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Task
            </Button>
          }
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-900">{totalTasks}</div>
          <div className="text-sm text-gray-600">Total Tasks</div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">{todoTasks}</div>
          <div className="text-sm text-gray-600">To Do</div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">{inProgressTasks}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <Select value={filter} onValueChange={(value: "All" | "Todo" | "In Progress" | "Completed") => setFilter(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Tasks</SelectItem>
              <SelectItem value="Todo">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Badge variant="outline" className="text-sm">
          {sortedTasks.length} task{sortedTasks.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      {/* Task List */}
      <div className="bg-white border rounded-lg p-6">
        <TaskList
          tasks={sortedTasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onToggleComplete={toggleTaskCompletion}
        />
      </div>
    </div>
  );
}
