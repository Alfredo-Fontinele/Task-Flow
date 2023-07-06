import { Task } from '@/application/entities/task/task.entity'
import { TaskRepository } from '@/application/repositories/task-repository'

export class InMemoryTaskRepository implements TaskRepository {
  public tasks: Task[] = []

  async create(task: Task): Promise<Task> {
    this.tasks.push(task)
    return task
  }

  async findAll(): Promise<Task[]> {
    return this.tasks
  }

  async findOne(id: string): Promise<Task | null> {
    const taskFound = this.tasks.find((task) => task.id === id)
    if (!taskFound) {
      return null
    }
    return taskFound
  }

  async update(id: string, task: Task): Promise<Task> {
    const index = this.tasks.findIndex((task) => task.id === id)
    this.tasks[index] = task
    task.props.updated_at = new Date()
    return this.tasks[index]
  }

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id)
  }
}
