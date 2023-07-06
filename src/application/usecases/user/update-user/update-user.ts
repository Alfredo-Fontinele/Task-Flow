import { User, UserProps } from '@/application/entities/user/user.entity'
import { UserRepository } from '@/application/repositories/user-repository'
import { Injectable } from '@nestjs/common'
import { UserNotFound } from '../../error/user-not-found'

type UpdateUserRequest = Partial<UserProps>

type UpdateUserResponse = User

@Injectable()
export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: UpdateUserRequest,
    id: string,
  ): Promise<UpdateUserResponse> {
    const userFound = await this.userRepository.findOne(id)
    if (!userFound) {
      throw new UserNotFound()
    }
    const updatedUser = new User(
      {
        ...userFound.props,
        ...request,
      },
      userFound.id,
    )

    return await this.userRepository.update(id, updatedUser)
  }
}
