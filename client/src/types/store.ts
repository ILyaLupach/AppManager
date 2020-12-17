import { TasksType, WorkshopsType, PersonType, UserType } from './global'

export type TasksStoreType = {
  loading: boolean
  tasks: Array<TasksType> | []
  isSendingTask: boolean
  showCompletedMessage: boolean
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
  limit: number
}

export type StatisticsStoreType = {
  loading: false,
  statistics: {
		positions: any[],
		persons: any[],
		date: any[],
  }
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
  statistics: StatisticsStoreType
}
