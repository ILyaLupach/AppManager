import { PersonType, TaskFile, TasksType, WorkshopsType } from '../types/global'

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

  getAllTasks = async (limit: Number, filter?: string, search?: string) => {
    let url: string = `/api/tasks?limit=${limit}`
    if (filter && search && filter !== 'Все') url += `&filter=${filter}&search=${search}`
    else if (search) url += `&search=${search}`
    else if (filter && filter !== 'Все') url += `&filter=${filter}`
    return await this.getResource(url)
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

  //files
  uploadFile = async (file: any, taskId: string) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('dir', taskId)
      const data: TaskFile = await fetch('api/files/upload', {
        method: 'POST',
        body: formData,
      }).then(res => res.json())
      return { data }
    } catch (error) {
      return { error }
    }
  }

  downloadFile = async (dir: string, name: string) => {
    try {
      const res: any = await fetch(`api/files/download?&dir=${dir}&name=${name}`)
      if (res.status === 200) {
        const blob = await res.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        return { url: downloadUrl }
      }
    } catch (error) {
      return { error }
    }
  }

  removeFile = async (dir: string, name: string) => {
    try {
      const { data } = await fetch(`api/files/remove?&dir=${dir}&name=${name}`, {
        method: 'DELETE'
      }).then(res => res.json())
      return { data }
    } catch (error) {
      return { error }
    }
  }

  getStatistics = async (first: Date, last: Date) => {
    const firstDate = String(first), lastDate = String(last)
    let url: string = `/api/tasks/statistics?firstDate=${firstDate}&lastDate=${lastDate}`
    return await this.getResource(url)
  }
}
