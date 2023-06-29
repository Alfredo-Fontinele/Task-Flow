export class UserNotFound extends Error {
  constructor(message?: string) {
    super(message ?? 'user not found')
  }
}
