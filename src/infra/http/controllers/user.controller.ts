import { CreateUser } from '@/application/usecases/user/create-user/create-user'
import { DeleteUser } from '@/application/usecases/user/delete-user/delete-user'
import { UpdateUser } from '@/application/usecases/user/update-user/update-user'
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common'
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto'
import { UserMapper, UserMapperResponse } from '../mappers/user-mapper'

@Controller('users')
export class UserController {
  constructor(
    private createUser: CreateUser,
    private updateUser: UpdateUser,
    private deleteUser: DeleteUser,
  ) {}

  @Post()
  async create(@Body() payload: CreateUserDTO): Promise<UserMapperResponse> {
    const { name, email } = payload
    const user = await this.createUser.execute({
      name,
      email,
    })
    return UserMapper.toHTTP(user)
  }

  @Patch(':id')
  async update(@Body() payload: UpdateUserDTO, @Param('id') id: string) {
    return await this.updateUser.execute(
      {
        name: payload.name,
        email: payload.email,
      },
      id,
    )
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUser.execute({
      user_id: id,
    })
  }
}
