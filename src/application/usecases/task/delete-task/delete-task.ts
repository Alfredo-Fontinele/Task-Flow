import { TaskRepository } from '@/application/repositories/task-repository'
import { Injectable } from '@nestjs/common'
import { TaskNotFound } from '../../error/task-not-found'

interface DeleteTaskRequest {
  task_id: string
}

type DeleteTaskResponse = void

@Injectable()
export class DeleteTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(request: DeleteTaskRequest): Promise<DeleteTaskResponse> {
    const task = await this.taskRepository.findOne(request.task_id)
    if (!task) {
      throw new TaskNotFound()
    }
    await this.taskRepository.delete(request.task_id)
  }
}
