import { Either, left, right } from '../shared/either'
import { InvalidNameError } from './errors/invalidNameError'

export class Name {
  public readonly value: string

  private constructor (name: string) {
    this.value = name
  }

  static create (name: string): Either<InvalidNameError, Name> {
    if (!Name.validate(name)) {
      return left(new InvalidNameError())
    }
    return right(new Name(name))
  }

  static validate (name: string): boolean {
    if (!name) {
      return false
    }

    if (name.trim().length < 2 || name.toString().length > 256) {
      return false
    }
    return true
  }
}
