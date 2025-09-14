import { z } from "zod";

export const TaskPriority = z.enum(["Low", "Medium", "High"]);
export const TaskStatus = z.enum(["Todo", "In Progress", "Completed"]);

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  dueDate: z.string().optional(),
  priority: TaskPriority,
  status: TaskStatus,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateTaskSchema = CreateTaskSchema.partial();

export type Task = z.infer<typeof TaskSchema>;
export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;
export type TaskPriorityType = z.infer<typeof TaskPriority>;
export type TaskStatusType = z.infer<typeof TaskStatus>;

// Subtask schema for AI breakdown
export const SubtaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  category: z.enum(["Research", "Action", "Review"]),
  estimatedTime: z.string().optional(),
  parentTaskId: z.string(),
});

export type Subtask = z.infer<typeof SubtaskSchema>;
