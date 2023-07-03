import { type InputUser } from './types/input-user'
import { type StoreUser } from './types/store-user'
import { v4 as uuid } from 'uuid'

class Store {
  public _users: StoreUser[]

  constructor() {
    this._users = []
  }

  getUsers() {
    return this._users
  }

  getUser(userId: string): StoreUser | false {
    const user = this._users.find(user => user.id === userId)
    return user ?? false
  }

  createUser(data: InputUser) {
    const id = uuid()

    this._users.push({
      id,
      username: data.username,
      age: data.age,
      hobbies: data.hobbies,
    })

    return true
  }

  updateUser(userId: string, data: InputUser) {
    const index = this._users.findIndex(user => user.id === userId)

    if (index === -1) {
      return false
    }

    this._users[index] = {
      id: this._users[index].id,
      username: data.username,
      age: data.age,
      hobbies: data.hobbies,
    }

    return this._users[index]
  }

  removeUser(userId: string) {
    const users = this._users.filter(user => user.id !== userId)

    if (users.length !== this._users.length) {
      this._users = users
      return true
    }

    return false
  }
}

export const store = new Store()
