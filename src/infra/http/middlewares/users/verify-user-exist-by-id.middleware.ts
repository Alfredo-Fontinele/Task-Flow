import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { NestMiddleware, NotFoundException } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

export class VerifyUserExistByIdMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const userExist = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    })
    if (!userExist) {
      throw new NotFoundException('user not found')
    }
    next()
  }
}
