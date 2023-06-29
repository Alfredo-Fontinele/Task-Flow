import { User } from '../user/user.entity'
import { Task } from './task.entity'

describe('Entity Case | Task', () => {
  it('should be able to instance a task', () => {
    const user = new User({
      name: 'user',
      email: 'user@gmail.com',
    })
    expect(
      () =>
        new Task({
          title: 'task',
          description: 'nova task',
          user_id: user.id,
        }),
    ).toBeTruthy()
  })
})
