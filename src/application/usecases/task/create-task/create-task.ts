import { Task } from '@/application/entities/task/task.entity'
import { TaskRepository } from '@/application/repositories/task-repository'
import { Injectable } from '@nestjs/common'

interface CreateTaskRequest {
  title: string
  description: string
  user_id: string
}

type CreateTaskResponse = Task

@Injectable()
export class CreateTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(request: CreateTaskRequest): Promise<CreateTaskResponse> {
    const task = new Task({
      title: request.title,
      description: request.description,
      user_id: request.user_id,
    })
    return await this.taskRepository.create(task)
  }
}
