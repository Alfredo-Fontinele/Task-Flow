import { Task, TaskProps } from '@/application/entities/task/task.entity'
import { TaskRepository } from '@/application/repositories/task-repository'
import { Injectable } from '@nestjs/common'
import { TaskNotFound } from '../../error/task-not-found'

type UpdateTaskRequest = Partial<TaskProps>

type UpdateTaskResponse = Task

@Injectable()
export class UpdateTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    request: UpdateTaskRequest,
    id: string,
  ): Promise<UpdateTaskResponse> {
    const taskFound = await this.taskRepository.findOne(id)
    if (!taskFound) {
      throw new TaskNotFound()
    }
    const updatedTask = new Task(
      {
        ...taskFound.props,
        ...request,
      },
      id,
    )
    return await this.taskRepository.update(id, updatedTask)
  }
}
