import { IUserRepository } from '../ports/IUserRepository'
import { IUserData } from '../../IUserData'

export class InMemoryUserRepository implements IUserRepository {
  private repository: IUserData[]

  constructor (repository: IUserData[]) {
    this.repository = repository
  }

  async add (user: IUserData): Promise<void> {
    const exists = await this.exists(user)
    if (!exists) {
      this.repository.push(user)
    }
  }

  async findUserByEmail (email: string): Promise<IUserData> {
    const users = this.repository.filter((user) => {
      return user.email === email
    })
    if (users.length > 0) {
      return users[0]
    }
    return null
  }

  async findAllUsers (): Promise<IUserData[]> {
    throw new Error('Method not implemented')
  }

  async exists (user: IUserData): Promise<boolean> {
    if (await this.findUserByEmail(user.email) === null) {
      return false
    }
    return true
  }
}
