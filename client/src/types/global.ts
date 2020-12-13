export type TasksType = {
  name: string[]
  date: Date
  start: Date
  finish: Date
  position: string
  object: string
  failure: string
  fix: string
  mark?: boolean | null
  _id?: number | null
  files: TaskFile[] | File[]
}

export type TaskFile = {
  name: string,
  type: string,
  size: number,
  path: string,
}

export type WorkshopsType = {
  name: string
  object: string[]
  _id?: number | null
}

export type PersonType = {
  name: string,
  surname: string,
  phone: string,
  position: string
  _id?: number | null
}

export type UserType = {
  email: string
  _id: string
  avatar?: any | null
  name?: string | null
  acces?: 'read-only' | 'standard' | 'admin' | null
}
