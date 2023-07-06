import { TodoStatusEnum } from '@/application/entities/task/task.entity'
import { PartialType } from '@nestjs/mapped-types'
import { IsEnum, IsString } from 'class-validator'

export class CreateTaskDTO {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsEnum(TodoStatusEnum)
  user_id: TodoStatusEnum
}

export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum
}
