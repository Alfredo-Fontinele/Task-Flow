import { CreateTask } from '@/application/usecases/task/create-task/create-task'
import { DeleteTask } from '@/application/usecases/task/delete-task/delete-task'
import { UpdateTask } from '@/application/usecases/task/update-task/update-task'
import { CreateUser } from '@/application/usecases/user/create-user/create-user'
import { DeleteUser } from '@/application/usecases/user/delete-user/delete-user'
import { UpdateUser } from '@/application/usecases/user/update-user/update-user'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { TaskController } from './controllers/task.controller'
import { UserController } from './controllers/user.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController, UserController],
  providers: [
    CreateTask,
    UpdateTask,
    DeleteTask,
    CreateUser,
    UpdateUser,
    DeleteUser,
  ],
})
export class HttpModule {}
