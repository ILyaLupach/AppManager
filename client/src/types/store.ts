import { TasksType } from './global'

export type TasksStoreType = {
    loading: boolean
    tasks: Array<TasksType> | null;
}

export type StoreType = {
    tasks: TasksStoreType
}
