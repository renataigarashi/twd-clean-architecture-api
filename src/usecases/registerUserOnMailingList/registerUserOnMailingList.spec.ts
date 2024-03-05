import { IUserData } from '../../entities/IUserData'
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
})
