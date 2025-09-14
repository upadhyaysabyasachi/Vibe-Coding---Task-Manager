"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { TaskForm } from "./task-form";
import { Task } from "@/lib/types";
import { Trash2, Edit, Calendar, Clock } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: any) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export function TaskList({ tasks, onUpdateTask, onDeleteTask, onToggleComplete }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Todo":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTask = (taskData: any) => {
    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
      setEditingTask(null);
      setIsEditDialogOpen(false);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No tasks yet. Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`border rounded-lg p-4 transition-all ${
            task.status === "Completed" 
              ? "bg-gray-50 border-gray-200 opacity-75" 
              : "bg-white border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <Checkbox
                checked={task.status === "Completed"}
                onCheckedChange={() => onToggleComplete(task.id)}
                className="mt-1"
              />
              
              <div className="flex-1 min-w-0">
                <h3 className={`font-medium ${
                  task.status === "Completed" 
                    ? "line-through text-gray-500" 
                    : "text-gray-900"
                }`}>
                  {task.title}
                </h3>
                
                {task.description && (
                  <p className={`text-sm mt-1 ${
                    task.status === "Completed" 
                      ? "text-gray-400" 
                      : "text-gray-600"
                  }`}>
                    {task.description}
                  </p>
                )}
                
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getStatusColor(task.status)}>
                    {task.status === "Todo" ? "To Do" : task.status}
                  </Badge>
                  
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  
                  {task.dueDate && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(task.dueDate)}
                    </div>
                  )}
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDate(task.createdAt)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditTask(task)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Task</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete &quot;{task.title}&quot;? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDeleteTask(task.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ))}
      
      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <TaskForm
            task={editingTask || undefined}
            onSubmit={handleUpdateTask}
            onCancel={() => {
              setEditingTask(null);
              setIsEditDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
