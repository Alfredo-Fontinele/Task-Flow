import { TaskRepository } from '@/application/repositories/task-repository'
import { UserRepository } from '@/application/repositories/user-repository'
import { Module } from '@nestjs/common'
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
export class DatabaseModule {}
