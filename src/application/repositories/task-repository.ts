import { Task } from '../entities/task/task.entity'

export abstract class TaskRepository {
  abstract create(task: Task): Promise<Task>
  abstract findAll(): Promise<Task[]>
  abstract findOne(id: string): Promise<Task | null>
  abstract update(task: Task, id: string): Promise<Task>
  abstract delete(id: string): Promise<void>
}