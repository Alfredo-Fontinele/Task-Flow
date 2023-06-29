import { makeUser } from '@/test/factories/make-user'
import { InMemoryUserRepository } from '@/test/repositories/in-memory-user-repository'
import { DeleteUser } from './delete-user'

describe('Entity Case | Delete User', () => {
  it('should be able to delete a user', async () => {
    const userRepository = new InMemoryUserRepository()
    const deleteUser = new DeleteUser(userRepository)

    const user = makeUser()
    await userRepository.create(user)
    await userRepository.delete(user.id)

    expect(userRepository.users).toHaveLength(0)
  })
})
