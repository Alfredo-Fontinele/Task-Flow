import { User } from '../entities/user/user.entity'

export abstract class UserRepository {
  abstract create(user: User): Promise<User>
  abstract findAll(): Promise<User[]>
  abstract findOne(id: string): Promise<User | null>
  abstract update(id: string, user: User): Promise<User>
  abstract delete(id: string): Promise<void>
}
