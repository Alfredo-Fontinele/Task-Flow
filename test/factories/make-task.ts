import { Task } from '@/application/entities/task/task.entity'

type MakeTaskProps = Partial<Task>

export const makeTask = (task: MakeTaskProps = {}) => {
  return new Task({
    title: 'new-task-fake',
    description: 'task-description-fake',
    user_id: 'fake-user-id',
    status: 'todo',
    ...task,
  })
}
