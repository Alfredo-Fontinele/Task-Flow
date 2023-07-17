import { Task } from '@/application/entities/task/task.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Task as TaskModel } from '@prisma/client'
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
        status: task.props.status,
        userId: task.props.user_id,
      },
    })
    return PrismaMapperTask.toDomain(newTask)
  }

  async findAll(): Promise<TaskModel[]> {
    return await this.prismaService.task.findMany({
      include: {
        user: true,
      },
    })
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.prismaService.task.findFirst({
      where: {
        id,
      },
    })
    if (!task) {
      throw new NotFoundException('task not found')
    }
    return PrismaMapperTask.toDomain(task)
  }

  async findOneByTitle(title: string): Promise<boolean> {
    const task = await this.prismaService.task.findFirst({
      where: {
        title,
      },
    })
    if (task) {
      return true
    }
    return false
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
