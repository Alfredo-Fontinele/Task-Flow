export class TaskNotFound extends Error {
  constructor(message?: string) {
    super(message ?? 'task not found')
  }
}
