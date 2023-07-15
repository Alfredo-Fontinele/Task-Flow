import { TaskRepository } from '@/application/repositories/task-repository'
import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { TaskSchema } from '../../schemas/task.schema'

@Injectable()
export class VerifyTaskAlreadyExistByTitleMiddleware implements NestMiddleware {
  constructor(private taskRepository: TaskRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const taskSchema = await TaskSchema.create.validate(req.body)
      const taskExist = await this.taskRepository.findOneByTitle(
        taskSchema.title,
      )
      if (taskExist) {
        throw new ConflictException('task already exist')
      }
      next()
    } catch (err: any) {
      return res.json({
        error: err.message,
      })
    }
  }
}
