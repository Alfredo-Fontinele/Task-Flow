import { UserRepository } from '@/application/repositories/user-repository'
import { Injectable } from '@nestjs/common'
import { UserNotFound } from '../../error/user-not-found'

interface DeleteUserRequest {
  user_id: string
}

type DeleteUserResponse = void

@Injectable()
export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    const existUser = await this.userRepository.findOne(request.user_id)
    if (!existUser) {
      throw new UserNotFound()
    }
    await this.userRepository.delete(existUser.id)
  }
}
