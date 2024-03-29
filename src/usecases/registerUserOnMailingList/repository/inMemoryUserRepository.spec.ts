import { IUserData } from '../../../entities/IUserData'
import { InMemoryUserRepository } from './inMemoryUserRepository'

describe('In memory User repository', () => {
  test('Shoud return null if user is not found', async () => {
    const users: IUserData[] = []
    const sut = new InMemoryUserRepository(users)
    const user = await sut.findUserByEmail('any@mail.com')
    expect(user).toBeNull()
  })

  test('should return user if it is found in the repository', async () => {
    const users: IUserData[] = []
    const name = 'any_name'
    const email = 'any@mail.com'
    const sut = new InMemoryUserRepository(users)
    await sut.add({ name, email })

    const user = await sut.findUserByEmail('any@mail.com')
    expect(user.name).toBe('any_name')
  })

  test('should return all users in the repository', async () => {
    const users: IUserData[] = [{ name: 'any_name', email: 'any@mail.com' }, { name: 'jhon', email: 'jhon@mail.com' }]
    const sut = new InMemoryUserRepository(users)
    const returnedUsers = sut.findAllUsers()
    expect((await returnedUsers).length).toBe(2)
  })
})
