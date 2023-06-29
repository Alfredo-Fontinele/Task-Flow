import { User } from '../entities/user/user.entity'

export abstract class UserRepository {
  abstract create(user: User): Promise<User>
  abstract findAll(): Promise<User[]>
  abstract findOne(id: string): Promise<User | null>
  abstract update(user: User, id: string): Promise<User>
  abstract delete(id: string): Promise<void>
}
