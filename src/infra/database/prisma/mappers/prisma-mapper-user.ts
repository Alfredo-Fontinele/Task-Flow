import { User } from '@/application/entities/user/user.entity'
import { User as UserModel } from '@prisma/client'

export class PrismaMapperUser {
  static toPrisma(user: User) {
    return {
      name: user.props.name,
      email: user.props.email
    }
  }

  static toDomain(raw: UserModel): User {
    return new User({
      name: raw.name,
      email: raw.email,
    }, raw.id)
  }
}
