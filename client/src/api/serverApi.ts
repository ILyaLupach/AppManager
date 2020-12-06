import { PersonType, TasksType, WorkshopsType } from '../types/global'

export default class ServerApi {

  getResource = async (url: string) => {
    const res = await fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response
      }).then(response => response.json())
      .catch(err => console.log("----------", " ", err))
    return res
  }

  getAllTasks = async () => {
    return await this.getResource("/api/tasks")
  }

  getAllWorkshops = async () => {
    return await this.getResource("/api/workshops")
  }

  getAllPersons = async () => {
    return await this.getResource("/api/persons")
  }

  createNewTasks = async (data: TasksType) => {
    try {
      const task = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      return { task }
    } catch (error) {
      return { error }
    }
  }

  addNewPerson = async (data: PersonType) => {
    try {
      const person = await fetch("/api/persons", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      return { person }
    } catch (error) {
      return { error }
    }
  }

  addNewWorkshops = async (data: WorkshopsType) => {
    try {
      const workshop = await fetch("/api/workshops", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      return { workshop }
    } catch (error) {
      return { error }
    }
  }

  deleteItem = async (id: any, url: string) => {
    return await fetch(`/api/${url}/${id}`, {
      method: "DELETE"
    }).then(res => true).catch(err => false)
  }

  updateData = async (url: string, id: any, data: any) => {
    try {
      const body = await fetch(`/api/${url}/${id}`, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      return { body }
    } catch (error) {
      return { error }
    }
  }

  //auth
  signUp = async (email: string, password: string, name: string) => {
    try {
      const data = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password: String(password), name: String(name) })
      }).then(res => res.json())
      return { data }
    } catch (error) {
      return { error }
    }
  }

  login = async (email: string, password: string) => {
    try {
      const data = await fetch('/api/auth/login', {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password: String(password) })
      }).then(res => res.json())
      return { data }
    } catch (error) {
      return { error }
    }
  }

  auth = async () => {
    try {
      const data = await fetch('/api/auth/auth', {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }).then(res => res.json())
      return { data }
    } catch (error) {
      return { error }
    }
  }

  //settings
  checkSettingsPassword = async (password: string) => {
    try {
      const valid = await fetch("/api/settings/password", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: String(password) })
      }).then(res => res.json())
      return valid
    } catch (error) {
      return false
    }
  }

  getAllUsers = async () => {
    return await this.getResource("/api/settings/users")
  }
}
