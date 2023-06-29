import { Task } from '@/application/entities/task/task.entity'
import { TaskRepository } from '@/application/repositories/task-repository'
import { Injectable } from '@nestjs/common'
import { TaskNotFound } from '../../error/task-not-found'

interface UpdateTaskRequest {
  task: Task
}

type UpdateTaskResponse = Task

@Injectable()
export class UpdateTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(request: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const { task } = request
    const taskFound = await this.taskRepository.findOne(task.id)
    if (!taskFound) {
      throw new TaskNotFound()
    }
    return await this.taskRepository.update(task, task.id)
  }
}
