import { left } from '../shared/either'
import { InvalidEmailError } from './errors/invalidEmailError'
import { User } from './user'

describe('User domain entity', () => {
  test('should not create user with invalid email adress', () => {
    const invalidEmail = 'invalid_mail'
    const error = User.create({ name: 'any_name', email: invalidEmail })

    expect(error).toEqual(left(new InvalidEmailError()))
  })
})
