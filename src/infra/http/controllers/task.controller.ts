import { CreateTask } from '@/application/usecases/task/create-task/create-task'
import { DeleteTask } from '@/application/usecases/task/delete-task/delete-task'
import { UpdateTask } from '@/application/usecases/task/update-task/update-task'
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common'
import { CreateTaskDTO, UpdateTaskDTO } from '../dtos/task.dto'
import { TaskMapper, TaskMapperResponse } from '../mappers/task-mapper'

@Controller('tasks')
export class TaskController {
  constructor(
    private createTask: CreateTask,
    private updateTask: UpdateTask,
    private deleteTask: DeleteTask,
  ) {}

  @Post()
  async create(@Body() payload: CreateTaskDTO): Promise<TaskMapperResponse> {
    const { title, description, user_id } = payload
    const user = await this.createTask.execute({
      title,
      description,
      user_id,
    })
    return TaskMapper.toHTTP(user)
  }

  @Patch(':id')
  async update(@Body() payload: UpdateTaskDTO, @Param('id') id: string) {
    return await this.updateTask.execute(
      {
        title: payload.title,
        description: payload.description,
        status: payload.status,
      },
      id,
    )
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteTask.execute({
      task_id: id,
    })
  }
}
