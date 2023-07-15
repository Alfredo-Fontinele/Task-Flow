import { makeTask } from '@/test/factories/make-task'
import { makeUser } from '@/test/factories/make-user'
import { InMemoryTaskRepository } from '@/test/repositories/in-memory-task-repository'
import { InMemoryUserRepository } from '@/test/repositories/in-memory-user-repository'
import { CreateTask } from './create-task'

describe('Entity Case | Create Task', () => {
  it('should be able to create a task', async () => {
    const taskRepository = new InMemoryTaskRepository()
    const userRepository = new InMemoryUserRepository()
    const createTask = new CreateTask(taskRepository, userRepository)

    const user = makeUser()
    const task = makeTask()

    await userRepository.create(user)

    await createTask.execute({ ...task.props, user_id: user.id })

    expect(taskRepository.tasks).toHaveLength(1)
  })
})
