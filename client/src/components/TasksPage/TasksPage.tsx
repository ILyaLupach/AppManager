import React, { useEffect } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { getAllTasks } from '../../actions'

import { StoreType } from '../../types/store'

const TasksPage: React.FC = () => {
    const tasks = useSelector(({ tasks }: StoreType) => tasks.tasks, shallowEqual)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllTasks())
    }, [])

    return (
        <div>
            <button onClick={() => console.log(tasks)}>
                click
            </button>
        </div>
    )
}

export default TasksPage
