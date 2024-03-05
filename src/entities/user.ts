import { Either, left } from '../shared/either'
import { IUserData } from './IUserData'
import { Email } from './email'
import { InvalidEmailError } from './errors/invalidEmailError'

export class User {
  static create (userData: IUserData): Either<InvalidEmailError, User> {
    const emailOrError = Email.create(userData.email)

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}
