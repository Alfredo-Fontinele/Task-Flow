import { PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsString } from 'class-validator'

export class CreateUserDTO {
  @IsString()
  name: string

  @IsEmail()
  email: string
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
