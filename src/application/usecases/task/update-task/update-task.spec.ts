import { makeTask } from '@/test/factories/make-task'
import { InMemoryTaskRepository } from '@/test/repositories/in-memory-task-repository'
import { UpdateTask } from './update-task'

describe('Use Case | Update Task', () => {
  it('should be able to update a task', async () => {
    const taskRepository = new InMemoryTaskRepository()
    const updateTask = new UpdateTask(taskRepository)

    const task = makeTask()
    await taskRepository.create(task)
    const taskUpdated = await updateTask.execute({ task })

    expect(taskUpdated.props).toHaveProperty('updated_at')
    expect(taskUpdated.props.updated_at).toStrictEqual(expect.any(Date))
  })
})
