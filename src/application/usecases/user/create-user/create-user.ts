import { User } from '@/application/entities/user/user.entity'
import { UserRepository } from '@/application/repositories/user-repository'
import { Injectable } from '@nestjs/common'

interface CreateUserRequest {
  name: string
  email: string
}

type CreateUserResponse = User

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const user = new User({
      name: request.name,
      email: request.email,
    })
    return await this.userRepository.create(user)
  }
}
