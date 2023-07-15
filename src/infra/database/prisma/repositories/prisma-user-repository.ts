import { User } from '@/application/entities/user/user.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { User as UserModel } from '@prisma/client'
import { PrismaMapperUser } from '../mappers/prisma-mapper-user'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUserRepository {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<UserModel[]> {
    return await this.prismaService.user.findMany({
      include: {
        task: true,
      },
    })
  }

  async create(user: User): Promise<User> {
    const raw = PrismaMapperUser.toPrisma(user)
    const newUser = await this.prismaService.user.create({
      data: raw,
    })
    return PrismaMapperUser.toDomain(newUser)
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    })
    if (!user) {
      throw new NotFoundException('user not found')
    }
    return PrismaMapperUser.toDomain(user)
  }

  async findOneByEmail(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    })
    if (user) {
      return true
      throw new NotFoundException('user already exist by email')
    }
    return false
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
