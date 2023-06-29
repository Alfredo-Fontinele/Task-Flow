import { User } from '@/application/entities/user/user.entity'
import { UserRepository } from '@/application/repositories/user-repository'

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = []
  async create(user: User): Promise<User> {
    await this.users.push(user)
    return user
  }

  async findAll(): Promise<User[]> {
    return this.users
  }

  async findOne(id: string): Promise<User | null> {
    const userFound = this.users.find((user) => user.id === id)
    if (!userFound) {
      return null
    }
    return userFound
  }

  async update(user: User, id: string): Promise<User> {
    const index = this.users.findIndex((user) => user.id === id)
    this.users[index] = user
    user.props.updated_at = new Date()
    return this.users[index]
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id)
  }
}
