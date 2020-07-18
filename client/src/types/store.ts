import { TasksType } from './global'

export type TasksStoreType = {
    loading: boolean
    tasks: Array<TasksType> | []
}

export type StoreType = {
    tasks: TasksStoreType
}
