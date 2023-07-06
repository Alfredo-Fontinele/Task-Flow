import { User } from '@/application/entities/user/user.entity'
import { Injectable } from '@nestjs/common'
import { PrismaMapperUser } from '../mappers/prisma-mapper-user'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<User> {
    const raw = PrismaMapperUser.toPrisma(user)
    const newUser = await this.prismaService.user.create({
      data: raw,
    })
    return PrismaMapperUser.toDomain(newUser)
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany()
    return users.map(PrismaMapperUser.toDomain)
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    })
    if (!user) {
      throw new Error('user not found')
    }
    return PrismaMapperUser.toDomain(user)
  }

  async update(user: User, id: string): Promise<User> {
    const raw = PrismaMapperUser.toPrisma(user)
    const userUpdated = await this.prismaService.user.update({
      where: {
        id,
      },
      data: raw,
    })
    return PrismaMapperUser.toDomain(userUpdated)
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id,
      },
    })
  }
}
