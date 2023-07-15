import { TodoStatusEnum } from '@/application/entities/task/task.entity'
import { PartialType } from '@nestjs/mapped-types'
import { IsEnum, IsString } from 'class-validator'

export class CreateTaskDTO {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsString()
  user_id: string
}

export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum
}
