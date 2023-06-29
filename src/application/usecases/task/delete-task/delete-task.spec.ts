import { makeTask } from '@/test/factories/make-task'
import { InMemoryTaskRepository } from '@/test/repositories/in-memory-task-repository'
import { DeleteTask } from './delete-task'

describe('Entity Case | Delete Task', () => {
  it('should be able to delete a task', async () => {
    const taskRepository = new InMemoryTaskRepository()
    const deleteTask = new DeleteTask(taskRepository)

    const task = makeTask()
    await taskRepository.create(task)
    await taskRepository.delete(task.id)

    expect(taskRepository.tasks).toHaveLength(0)
  })
})
