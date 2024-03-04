import { IUserData } from '../../IUserData'
import { InMemoryUserRepository } from './inMemoryUserRepository'

describe('In memory User repository', () => {
  test('Shoud return null if user is not found', async () => {
    const users: IUserData[] = []
    const userRepo = new InMemoryUserRepository(users)
    const user = await userRepo.findUserByEmail('any@mail.com')
    expect(user).toBeNull()
  })
})
