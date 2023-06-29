import { Entity } from '@/core/domain/Entity'

export type TodoStatus = 'todo' | 'doing' | 'done'

export interface TaskProps {
  title: string
  description: string
  user_id: string
  status?: TodoStatus
  created_at?: Date
  updated_at?: Date
}

export class Task extends Entity<TaskProps> {
  constructor(props: TaskProps, id?: string) {
    super(
      {
        ...props,
        status: 'todo',
        created_at: props.created_at ?? new Date(),
      },
      id,
    )
  }

  updateStatus(status: TodoStatus) {
    this.props.status = status
    this.props.updated_at = new Date()
  }
}
