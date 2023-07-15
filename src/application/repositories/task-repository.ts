import { Task } from '../entities/task/task.entity'

export abstract class TaskRepository {
  abstract create(task: Task): Promise<Task>
  abstract findAll(): Promise<Task[]>
  abstract findOne(id: string): Promise<Task | null>
  abstract findOneByTitle(id: string): Promise<boolean>
  abstract update(id: string, task: Task): Promise<Task>
  abstract delete(id: string): Promise<void>
}
