import { TasksType } from '../types/global';

export default (tasks: TasksType[], filterBy: string, searchQuery: string): TasksType[] | null => {
    tasks = tasks.filter(
        (item) =>
            item.name.join('').indexOf(searchQuery) >= 0 ||
            item.object.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0 ||
            item.failure.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0 ||
            item.fix.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
    )
    if (filterBy === "Все") return tasks;
    const validTasks: TasksType[] = tasks.filter(item => item.position === filterBy)
    return validTasks.length ? validTasks : null
}
