import { Either, left } from '../shared/either'
import { IUserData } from './IUserData'
import { Email } from './email'
import { InvalidEmailError } from './errors/invalidEmailError'
import { InvalidNameError } from './errors/invalidNameError'
import { Name } from './name'

export class User {
  static create (userData: IUserData): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name)
    if (nameOrError.isLeft()) {
      return left(new InvalidNameError())
    }
    const emailOrError = Email.create(userData.email)

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}
