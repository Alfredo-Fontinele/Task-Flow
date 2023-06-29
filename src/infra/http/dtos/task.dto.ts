import { PartialType } from '@nestjs/mapped-types'
import { TodoStatus } from '@prisma/client'
import { IsEnum, IsString } from 'class-validator'

export class CreateTaskDTO {
  @IsString()
  title: string

  @IsString()
  description: string
}

export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {
  @IsEnum(TodoStatus)
  status: string
}
