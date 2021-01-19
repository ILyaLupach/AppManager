import React, { Fragment, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType, TasksStoreType } from '../../types/store'
import { TasksType } from '../../types/global'
import NewTasks from './components/NewTaskForm';
import { MiniPreloader } from '../Preloader';
import { formatTime } from '../../utils/formatTime';
import MobileTaskItem from './components/MobileTaskItem';
import { setLoading, setLimit } from 'src/actions/tasksActions'

export default function ControlledAccordions() {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false)
  const [firstVisit, setFirstVisit] = useState(true)
  const [currentScroll, setCurrentScroll] = useState(0)
  const [changeTask, setChangeTask] =
    useState<{ isOpen: boolean, task: TasksType | null }>({ isOpen: false, task: null })
  const { acces } = useSelector(({ user }: StoreType) => user)
  const { tasks, loading }: TasksStoreType = useSelector(({ tasks }: StoreType) => tasks)
  const dispatch = useDispatch()
  const pageRef = useRef<any>(null)
  useEffect(() => {
    if (!tasks.length) return
    setCurrentScroll(pageRef?.current?.scrollHeight)
    if (firstVisit) {
      window.scrollTo(0, pageRef?.current?.scrollHeight)
      return setFirstVisit(false)
    }
    window.scrollTo(0, pageRef?.current?.scrollHeight - currentScroll - 300)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks.length])

  useEffect(() => {
    document.addEventListener('scroll', trackScrolling);
    return () => {
      document.removeEventListener('scroll', trackScrolling)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const trackScrolling = () => {
    if (window.pageYOffset === 0) {
      !loading && dispatch(setLimit(100))
    }
  }

  const openAddForm = () => setIsOpenAddForm(true)
  const closeAddForm = () => setIsOpenAddForm(false)

  const openEditForm = (task: TasksType) => setChangeTask({ isOpen: true, task })
  const closeEditForm = () => setChangeTask({ isOpen: false, task: null })

  const tasksList = _.orderBy(tasks, ['date'], ['asc'])

  return (
    <section
      className={clsx(
        'mobile-tasks-page', acces === 'read-only' && 'mobile-tasks-page_read-only'
      )}
      ref={pageRef}
    >
      {tasksList?.map((task, i, arr) => (
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
