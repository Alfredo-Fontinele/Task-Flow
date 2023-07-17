import { Entity } from '@/core/domain/entity'

export interface UserProps {
  name: string
  email: string
  created_at?: Date
  updated_at?: Date
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    )
  }
}
