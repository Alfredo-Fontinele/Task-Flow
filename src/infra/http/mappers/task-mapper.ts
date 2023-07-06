import { Task, TodoStatusType } from '@/application/entities/task/task.entity'
import { User } from '@/application/entities/user/user.entity'

interface TaskMapperRequest extends Task {
  user?: User
}

export interface TaskMapperResponse {
  id: string
  description: string
  status: TodoStatusType
  title: string
  user?: User
  created_at?: Date
  updated_at?: Date
}

export class TaskMapper {
  static toHTTP(task: TaskMapperRequest): TaskMapperResponse {
    const {
      id,
      props: { description, status, title, user_id, created_at, updated_at },
      user,
    } = task
    return {
      id,
      description,
      title,
      status,
      user,
      created_at,
      updated_at,
    }
  }
}
