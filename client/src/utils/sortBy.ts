import { TasksType } from '../types/global'

export default (tasks: TasksType[], filterBy: string, searchQuery: string): TasksType[] | null => {
    if (searchQuery.length > 1) {
        searchQuery = searchQuery.toLowerCase()
        tasks = tasks.filter(
            (item) =>
                item.name.map(str => str.toLowerCase()).join('').includes(searchQuery) ||
                item.position.toLowerCase().includes(searchQuery) ||
                item.object.toLowerCase().includes(searchQuery) ||
                item.failure.toLowerCase().includes(searchQuery) ||
                item.fix.toLowerCase().includes(searchQuery)
        )
    }
    if (filterBy === "Все") return tasks
    const validTasks: TasksType[] = tasks.filter(item => item.position === filterBy)
    return validTasks.length ? validTasks : null
}
