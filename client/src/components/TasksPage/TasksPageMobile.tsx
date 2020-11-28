import React, { Fragment, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import sortBy from '../../utils/sortBy'
import { getAllTasks } from '../../actions'
import { FilterStoreType, StoreType, TasksStoreType } from '../../types/store'
import { TasksType } from '../../types/global'
import sizeArr from '../../utils/sizeArr'
import AddNewTasks from './components/NewTaskForm';
import { MiniPreloader } from '../Preloader';
import { formatTime } from '../../utils/formatTime';
import MobileTaskItem from './components/MobileTaskItem';

export default function ControlledAccordions() {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false)
  const [changeTask, setChangeTask] =
    useState<{ isOpen: boolean, task: TasksType | null }>({ isOpen: false, task: null })

  const { tasks, loading }: TasksStoreType = useSelector(({ tasks }: StoreType) => tasks)
  const { filterBy, searchQuery }: FilterStoreType =
    useSelector(({ filter }: StoreType) => filter)
  const dispatch = useDispatch()

  const pageRef = useRef<any>(null)

  useEffect(() => {
    !tasks.length && dispatch(getAllTasks())
    window.scrollTo(0, pageRef?.current?.scrollHeight)
  }, [tasks.length])

  const openAddForm = () => setIsOpenAddForm(true)
  const closeAddForm = () => setIsOpenAddForm(false)

  const openEditForm = (task: TasksType) => setChangeTask({ isOpen: true, task })
  const closeEditForm = () => setChangeTask({ isOpen: false, task: null })

  const deleteTasks = (task: TasksType) => {
    console.log('delete: ', task.object)
  }

  const validTasks: TasksType[] | null =
    sortBy(_.orderBy(sizeArr(tasks, 50), ['date'], ['asc']), filterBy, searchQuery)

  return (
    <div className='mobile-tasks-page' ref={pageRef}>
      {validTasks?.map((task, i, arr) => (
        <Fragment key={task._id}>
          {new Date(task.date).getDate() !== new Date(arr[i - 1]?.date).getDate() && (
            <span className="mobile-tasks-page__date-title">
              {`${formatTime(new Date(task.date).getDate())} / ${formatTime(new Date(task.date).getMonth() + 1)} / ${new Date(task.date).getFullYear()}`}
            </span>
          )}
          <MobileTaskItem
            task={task}
            deleteTasks={deleteTasks}
            openEditForm={openEditForm}
          />
        </Fragment>
      ))}
      <button
        className='mobile-tasks-page__add-btn'
        onClick={openAddForm}
      >
        Добавить новую задачу
      </button>
      {isOpenAddForm && <AddNewTasks onClose={closeAddForm} />}
      {changeTask.isOpen && <AddNewTasks onClose={closeEditForm} prevTask={changeTask.task} />}
      {loading && <MiniPreloader />}
    </div >
  )
}
