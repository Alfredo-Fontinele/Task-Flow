import { Task } from '@/application/entities/task/task.entity'
import { TaskRepository } from '@/application/repositories/task-repository'
import { UserRepository } from '@/application/repositories/user-repository'
import { Injectable, NotFoundException } from '@nestjs/common'

interface CreateTaskRequest {
  title: string
  description: string
  user_id: string
}

type CreateTaskResponse = Task

@Injectable()
export class CreateTask {
  constructor(
    private taskRepository: TaskRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(request: CreateTaskRequest): Promise<CreateTaskResponse> {
    const user = await this.userRepository.findOne(request.user_id)
    if (!user) {
      throw new NotFoundException('user not found by user_id')
    }
    const task = new Task({
      title: request.title,
      description: request.description,
      status: 'todo',
      user_id: request.user_id,
    })
    return await this.taskRepository.create(task)
  }
}
