import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { ConflictException, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

export class VerifyUserAlreadyMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body
    const userExist = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    })
    if (userExist) {
      throw new ConflictException('user already exist')
    }
    next()
  }
}
