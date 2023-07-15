import { UserRepository } from '@/application/repositories/user-repository'
import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { UserSchema } from '../../schemas/user.schema'

@Injectable()
export class VerifyUserAlreadyExistByEmailMiddleware implements NestMiddleware {
  constructor(private useRepository: UserRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const userSchema = await UserSchema.create.validate(req.body)
      const userExist = await this.useRepository.findOneByEmail(
        userSchema.email,
      )
      if (userExist) {
        throw new ConflictException('user already exist')
      }
      next()
    } catch (err: any) {
      return res.json({
        error: err.message,
      })
    }
  }
}
