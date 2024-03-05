import { left } from '../shared/either'
import { InvalidNameError } from './errors/invalidNameError'
import { InvalidEmailError } from './errors/invalidEmailError'
import { User } from './user'

describe('User domain entity', () => {
  test('should not create user with invalid email adress', () => {
    const invalidEmail = 'invalid_mail'
    const error = User.create({ name: 'any_name', email: invalidEmail })

    expect(error).toEqual(left(new InvalidEmailError()))
  })

  test('should not create user with invalid name (too few chacacters', () => {
    const invalidName = 'R       '
    const error = User.create({ name: invalidName, email: 'any@mail.com' })

    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should not create user with invalid name (too many chacacters', () => {
    const invalidName = 'R'.repeat(257)
    const error = User.create({ name: invalidName, email: 'any@mail.com' })

    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should create user with valid data', () => {
    const validName = 'any_name'
    const validEmail = 'any@mail.com'
    const user: User = User.create({ name: validName, email: validEmail }).value as User

    expect(user.name.value).toEqual(validName)
    expect(user.email.value).toEqual(validEmail)
  })
})
