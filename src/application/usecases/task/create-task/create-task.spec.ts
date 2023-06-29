import { makeTask } from '@/test/factories/make-task'
import { InMemoryTaskRepository } from '@/test/repositories/in-memory-task-repository'
import { CreateTask } from './create-task'

describe('Entity Case | Create Task', () => {
  it('should be able to create a task', async () => {
    const taskRepository = new InMemoryTaskRepository()
    const createTask = new CreateTask(taskRepository)

    const task = makeTask()
    await createTask.execute({ ...task.props })

    expect(taskRepository.tasks).toHaveLength(1)
  })
})
