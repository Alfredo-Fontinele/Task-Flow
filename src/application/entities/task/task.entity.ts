import { Entity } from '@/core/domain/entity'

export type TodoStatusType = 'todo' | 'doing' | 'done'

export enum TodoStatusEnum {
  todo = 'todo',
  doing = 'doing',
  done = 'done',
}

export interface TaskProps {
  title: string
  description: string
  user_id: string
  status: TodoStatusType
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

  updateStatus(status: TodoStatusType) {
    this.props.status = status
    this.props.updated_at = new Date()
  }
}
