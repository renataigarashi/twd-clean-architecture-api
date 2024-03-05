import { IUserData } from '../../entities/IUserData'
import { InvalidNameError } from '../../entities/errors/invalidNameError'
import { User } from '../../entities/user'
import { Either, left, right } from '../../shared/either'
import { IUserRepository } from './ports/IUserRepository'

export class RegisterUserOnMailingList {
  private readonly userRepo: IUserRepository

  constructor (userRepo: IUserRepository) {
    this.userRepo = userRepo
  }

  public async registerUserOnMailingList (request: IUserData): Promise<Either<InvalidNameError | InvalidNameError, IUserData>> {
    const userOrError: Either<InvalidNameError | InvalidNameError, User> = User.create(request)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    if (!(await this.userRepo.exists(request))) {
      await this.userRepo.add(request)
    }
    return right(request)
  }
}
