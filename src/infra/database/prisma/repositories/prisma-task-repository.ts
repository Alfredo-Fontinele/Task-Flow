import { Task } from '@/application/entities/task/task.entity'
import { Injectable } from '@nestjs/common'
import { PrismaMapperTask } from '../mappers/prisma-mapper-task'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaTaskRepository {
  constructor(private prismaService: PrismaService) {}

  async create(task: Task): Promise<Task> {
    const raw = PrismaMapperTask.toPrisma(task)
    const newTask = await this.prismaService.task.create({
      data: {
        description: raw.description,
        title: raw.title,
        status: 'doing',
        userId: task.props.user_id,
      },
    })
    return PrismaMapperTask.toDomain(newTask)
  }

  async findAll(): Promise<Task[]> {
    const Tasks = await this.prismaService.task.findMany()
    return Tasks.map(PrismaMapperTask.toDomain)
  }

  async findOne(id: string): Promise<Task> {
    const Task = await this.prismaService.task.findFirst({
      where: {
        id,
      },
    })
    if (!Task) {
      throw new Error('Task not found')
    }
    return PrismaMapperTask.toDomain(Task)
  }

  async update(Task: Task, id: string): Promise<Task> {
    const raw = PrismaMapperTask.toPrisma(Task)
    const TaskUpdated = await this.prismaService.task.update({
      where: {
        id,
      },
      data: raw,
    })
    return PrismaMapperTask.toDomain(TaskUpdated)
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.task.delete({
      where: {
        id,
      },
    })
  }
}
