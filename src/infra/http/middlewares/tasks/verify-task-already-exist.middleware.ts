import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { ConflictException, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

export class VerifyTaskAlreadyMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { title } = req.body
    const taskExist = await this.prismaService.task.findFirst({
      where: {
        title,
      },
    })
    if (taskExist) {
      throw new ConflictException('task already exist')
    }
    next()
  }
}
