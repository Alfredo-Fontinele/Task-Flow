import { User } from '@/application/entities/user/user.entity'
import { UserRepository } from '@/application/repositories/user-repository'
import { Injectable } from '@nestjs/common'
import { UserNotFound } from '../../error/user-not-found'

interface UpdateUserRequest {
  user: User
}

type UpdateUserResponse = User

@Injectable()
export class Updateuser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { user } = request
    const userFound = await this.userRepository.findOne(user.id)
    if (!userFound) {
      throw new UserNotFound()
    }
    return await this.userRepository.update(user, user.id)
  }
}
