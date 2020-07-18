import { TasksType } from './global';

export type ActionType<T> = {
    type: string
    payload: T
}
