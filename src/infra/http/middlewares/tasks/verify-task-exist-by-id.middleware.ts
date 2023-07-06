import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { NestMiddleware, NotFoundException } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

export class VerifyTaskExistByIdMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const taskExist = await this.prismaService.task.findFirst({
      where: {
        id,
      },
    })
    if (!taskExist) {
      throw new NotFoundException('task not found')
    }
    next()
  }
}
