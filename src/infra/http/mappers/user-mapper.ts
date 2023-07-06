import { Task } from '@/application/entities/task/task.entity'
import { User } from '@/application/entities/user/user.entity'

interface UserMapperRequest extends User {
  task?: Task[]
}

export interface UserMapperResponse {
  id: string
  name: string
  email: string
  created_at?: Date
  updated_at?: Date
  task?: Task[]
}

export class UserMapper {
  static toHTTP(user: UserMapperRequest): UserMapperResponse {
    const {
      id,
      props: { email, name, created_at, updated_at },
      task,
    } = user
    return {
      id,
      name,
      email,
      task,
      created_at,
      updated_at,
    }
  }
}
