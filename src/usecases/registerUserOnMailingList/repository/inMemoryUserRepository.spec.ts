import { IUserData } from '../../IUserData'
import { InMemoryUserRepository } from './inMemoryUserRepository'

describe('In memory User repository', () => {
  test('Shoud return null if user is not found', async () => {
    const users: IUserData[] = []
    const userRepo = new InMemoryUserRepository(users)
    const user = await userRepo.findUserByEmail('any@mail.com')
    expect(user).toBeNull()
  })

  test('shoud return user if it is found in the repository', async () => {
    const users: IUserData[] = []
    const name = 'any_name'
    const email = 'any@mail.com'
    const userRepo = new InMemoryUserRepository(users)
    await userRepo.add({ name, email })

    const user = await userRepo.findUserByEmail('any@mail.com')
    expect(user.name).toBe('any_name')
  })
})
