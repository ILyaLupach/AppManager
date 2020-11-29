export type TasksType = {
  name: string[]
  date: Date
  start: Date
  finish: Date
  position: string
  object: string
  failure: string
  fix: string
  mark?: boolean
  _id?: number
}

export type WorkshopsType = {
  name: string
  object: string[]
  _id?: number
}

export type PersonType = {
  name: string,
  surname: string,
  phone: string,
  position: string
  _id?: number
}
