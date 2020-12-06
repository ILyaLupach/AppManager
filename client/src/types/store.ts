import { TasksType, WorkshopsType, PersonType, UserType } from './global'

export type TasksStoreType = {
  loading: boolean
  tasks: Array<TasksType> | []
}

export type WorkshopsStoreType = {
  workshops: Array<WorkshopsType> | []
}

export type PersonsStoreType = {
  loading: boolean
  persons: Array<PersonType> | []
}

export type FilterStoreType = {
  searchQuery: string,
  filterBy: string
}

export type UserStoreType = {
  user: UserType | null
  loading: boolean
  isGuest: boolean
  error: string
  acces: 'read-only' | 'standard' | 'admin'
}

export type StoreType = {
  tasks: TasksStoreType
  workshops: WorkshopsStoreType
  filter: FilterStoreType
  persons: PersonsStoreType
  user: UserStoreType
}
