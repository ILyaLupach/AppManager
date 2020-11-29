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
    return await res
  }

  getAllTasks = async () => {
    const tasks = await this.getResource("/tasks")
      .then((res) => {
        return res
      })
    return await tasks
  }

  getAllWorkshops = async () => {
    const workshops = this.getResource("/workshops")
      .then((res) => {
        return res
      })
    return await workshops
  }

  getAllPersons = async () => {
    const persons = await this.getResource("/persons")
      .then((res) => {
        return res
      }).catch(err => console.log("----------", " ", err))
    return await persons
  }

  createNewTasks = async (data: TasksType) => {
    try {
      const task = await fetch("/tasks", {
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
      const person = await fetch("/persons", {
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

  // addNewWorkshops = async (data: WorkshopsType) => {
  //   const workshop = await fetch("/workshops", {
  //     method: "POST",
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(data)
  //   })
  //   return workshop
  // }

  deleteItem = async (id: any, url: string) => {
    return await fetch(`/${url}/${id}`, {
      method: "DELETE"
    }).then(res => true).catch(err => false)
  }

  updateData = async (url: string, id: any, data: any) => {
    try {
      const body = await fetch(`/${url}/${id}`, {
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
}
