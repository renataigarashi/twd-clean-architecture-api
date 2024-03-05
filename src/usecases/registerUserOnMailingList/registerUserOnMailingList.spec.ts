import { IUserData } from '../../entities/IUserData'
import { InvalidEmailError } from '../../entities/errors/invalidEmailError'
import { left } from '../../shared/either'
import { IUserRepository } from './ports/IUserRepository'
import { RegisterUserOnMailingList } from './registerUserOnMailingListUseCase'
import { InMemoryUserRepository } from './repository/inMemoryUserRepository'

describe('Register user on mailing list use case', () => {
  test('Should add user with complete data to mailing list', async () => {
    const users: IUserData[] = []
    const repo: IUserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'Any_name'
    const email = 'any@mail.com'
    const response = await useCase.registerUserOnMailingList({ name, email })
    const user = repo.findUserByEmail('any@mail.com')
    expect((await user).name).toBe('Any_name')
    expect(response.value.name).toBe('Any_name')
  })

  test('Should not add user with invalid email to mail list', async () => {
    const users: IUserData[] = []
    const repo: IUserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'Any_name'
    const invalidEmail = 'invalid_mail'
    const response = await useCase.registerUserOnMailingList({ name, email: invalidEmail })
    const user = await repo.findUserByEmail(invalidEmail)
    expect(user).toBeNull()
    expect(response).toEqual(left(new InvalidEmailError()))
  })
})
