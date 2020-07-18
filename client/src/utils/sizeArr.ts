import { TasksType } from '../types/global'

const sizeArr = (tasks: TasksType[], length: number): TasksType[] => {
    if(tasks && tasks.length > length) {
        tasks.splice(0, tasks.length - length)
        return tasks
    }
    else return tasks
}

export default sizeArr
