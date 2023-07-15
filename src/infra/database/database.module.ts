import { TaskRepository } from '@/application/repositories/task-repository'
import { UserRepository } from '@/application/repositories/user-repository'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

import { VerifyTaskAlreadyExistByTitleMiddleware } from '../http/middlewares/tasks/verify-task-already-exist-by-title.middleware'
import { VerifyUserAlreadyExistByEmailMiddleware } from '../http/middlewares/users/verify-user-already-exist-by-email.middleware'
import { PrismaService } from './prisma/prisma.service'
import { PrismaTaskRepository } from './prisma/repositories/prisma-task-repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'

@Module({
  providers: [
    PrismaService,
    {
      useClass: PrismaTaskRepository,
      provide: TaskRepository,
    },
    {
      useClass: PrismaUserRepository,
      provide: UserRepository,
    },
  ],
  exports: [TaskRepository, UserRepository],
})
export class DatabaseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyTaskAlreadyExistByTitleMiddleware)
      .forRoutes({ path: 'tasks', method: RequestMethod.POST })
    consumer
      .apply(VerifyUserAlreadyExistByEmailMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST })
  }
}
