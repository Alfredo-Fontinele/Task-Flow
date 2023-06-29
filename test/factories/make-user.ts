import { User } from '@/application/entities/user/user.entity'

type MakeUserProps = Partial<User>

export const makeUser = (user: MakeUserProps = {}) => {
  return new User({
    name: 'fake-username',
    email: 'fake-user@gmail.com',
    ...user,
  })
}
