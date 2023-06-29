import { User } from './user.entity'

describe('Entity Case | User', () => {
  it('should be able to instance a user', () => {
    expect(
      () =>
        new User({
          name: 'new-user',
          email: 'user@gmail.com',
        }),
    ).toBeTruthy()
  })
})
