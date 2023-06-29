import { makeUser } from '@/test/factories/make-user'
import { InMemoryUserRepository } from '@/test/repositories/in-memory-user-repository'
import { Updateuser } from './update-user'

describe('Use Case | Update User', () => {
  it('should be able to update a User', async () => {
    const userRepository = new InMemoryUserRepository()
    const updateUser = new Updateuser(userRepository)

    const user = makeUser()
    await userRepository.create(user)
    const userUpdated = await updateUser.execute({ user })

    expect(userUpdated.props).toHaveProperty('updated_at')
    expect(userUpdated.props.updated_at).toStrictEqual(expect.any(Date))
  })
})
