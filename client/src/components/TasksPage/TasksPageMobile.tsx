import React, { Fragment, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import sortBy from '../../utils/sortBy'
import { FilterStoreType, StoreType, TasksStoreType } from '../../types/store'
import { TasksType } from '../../types/global'
import sizeArr from '../../utils/sizeArr'
import NewTasks from './components/NewTaskForm';
import { MiniPreloader } from '../Preloader';
import { formatTime } from '../../utils/formatTime';
import MobileTaskItem from './components/MobileTaskItem';

export default function ControlledAccordions() {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false)
  const [changeTask, setChangeTask] =
    useState<{ isOpen: boolean, task: TasksType | null }>({ isOpen: false, task: null })
  const { acces } = useSelector(({ user }: StoreType) => user)
  const { tasks, loading }: TasksStoreType = useSelector(({ tasks }: StoreType) => tasks)
  const { filterBy, searchQuery }: FilterStoreType =
    useSelector(({ filter }: StoreType) => filter)

  const pageRef = useRef<any>(null)

  useEffect(() => {
    window.scrollTo(0, pageRef?.current?.scrollHeight)
  }, [])

  const openAddForm = () => setIsOpenAddForm(true)
  const closeAddForm = () => setIsOpenAddForm(false)

  const openEditForm = (task: TasksType) => setChangeTask({ isOpen: true, task })
  const closeEditForm = () => setChangeTask({ isOpen: false, task: null })

  const validTasks: TasksType[] | null =
    sortBy(_.orderBy(tasks, ['date'], ['asc']), filterBy, searchQuery)

  return (
    <section
      className={clsx('mobile-tasks-page', acces === 'read-only' && 'mobile-tasks-page_read-only')}
      ref={pageRef}>
      {validTasks?.map((task, i, arr) => (
        <Fragment key={task._id || i}>
          {new Date(task.date).getDate() !== new Date(arr[i - 1]?.date).getDate() && (
            <span className="mobile-tasks-page__date-title">
              {`${formatTime(new Date(task.date).getDate())} / ${formatTime(new Date(task.date).getMonth() + 1)} / ${new Date(task.date).getFullYear()}`}
            </span>
          )}
          <MobileTaskItem
            task={task}
            openEditForm={openEditForm}
          />
        </Fragment>
      ))}
      {acces !== 'read-only' && (
        <button
          className='mobile-tasks-page__add-btn'
          onClick={openAddForm}
        >
          Добавить новую задачу
        </button>
      )}
      {isOpenAddForm && <NewTasks onClose={closeAddForm} />}
      {changeTask.isOpen && <NewTasks onClose={closeEditForm} prevTask={changeTask.task} />}
      {loading && <MiniPreloader />}
    </section >
  )
}
