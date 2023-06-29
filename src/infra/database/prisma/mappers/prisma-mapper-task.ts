import { Task } from '@/application/entities/task/task.entity'
import { Task as TaskModel } from '@prisma/client'

export class PrismaMapperTask {
  static toPrisma(task: Task) {
    return {
      description: task.props.description,
      status: task.props.status,
      title: task.props.title,
    }
  }

  static toDomain(raw: TaskModel): Task {
    return new Task(
      {
        title: raw.title,
        description: raw.description,
        user_id: raw.userId,
        created_at: raw.created_at,
        status: raw.status,
        updated_at: raw.updated_at,
      },
      raw.id,
    )
  }
}
