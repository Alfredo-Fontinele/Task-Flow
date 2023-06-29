import { makeUser } from '@/test/factories/make-user'
import { InMemoryUserRepository } from '@/test/repositories/in-memory-user-repository'
import { CreateUser } from './create-user'

describe('Entity Case | Create User', () => {
  it('should be able to create a User', async () => {
    const userRepository = new InMemoryUserRepository()
    const createUser = new CreateUser(userRepository)

    const user = makeUser()
    await createUser.execute({ ...user.props })

    expect(userRepository.users).toHaveLength(1)
  })
})
