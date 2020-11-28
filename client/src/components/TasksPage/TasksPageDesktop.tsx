import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { withStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import sortBy from '../../utils/sortBy'
import { getAllTasks } from '../../actions'
import { MiniPreloader } from '../Preloader'
import { StoreType, FilterStoreType, TasksStoreType } from '../../types/store'
import { TasksType } from '../../types/global'
import AddNewTasks from './components/NewTaskForm'
import sizeArr from '../../utils/sizeArr'

import './TasksPage.scss'
import DesktopTaskItem from './components/DesktopTaskItem'


const StyledTableCell = withStyles((theme: Theme) => ({
  head: {
    fontSize: 14,
    padding: '10px 5px',
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
  },
  body: {
    fontSize: 14,
    padding: '5px 15px 5px 5px',
  },
}))(TableCell)

const TasksPageDesktop: React.FC = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false)
  const [changeTask, setChangeTask] =
    useState<{ isOpen: boolean, task: TasksType | null }>({ isOpen: false, task: null })

  const { tasks, loading }: TasksStoreType = useSelector(({ tasks }: StoreType) => tasks)
  const { filterBy, searchQuery }: FilterStoreType =
    useSelector(({ filter }: StoreType) => filter)
  const dispatch = useDispatch()

  useEffect(() => {
    !tasks.length && dispatch(getAllTasks())
  }, [tasks.length])

  const openAddForm = () => setIsOpenAddForm(true)
  const closeAddForm = () => setIsOpenAddForm(false)

  const openEditForm = (task: TasksType) => setChangeTask({ isOpen: true, task })
  const closeEditForm = () => setChangeTask({ isOpen: false, task: null })

  const deleteTasks = (task: TasksType) => {
    console.log('delete: ', task.object)
  }

  const validTasks: TasksType[] | null =
    sortBy(_.orderBy(sizeArr(tasks, 50), ['date'], ['desc']), filterBy, searchQuery)

  return (
    <section className='page desktop-tasks-page'>
      <TableContainer style={{ height: '100%' }}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ minWidth: 185 }} align="left">
                Время
              </StyledTableCell>
              <StyledTableCell style={{ minWidth: 220 }} align="left">
                Ф.И.О. работников
              </StyledTableCell>
              <StyledTableCell style={{ minWidth: 220 }} align="left">
                Цех
              </StyledTableCell>
              <StyledTableCell style={{ minWidth: 220 }} align="left">
                Проблема
              </StyledTableCell>
              <StyledTableCell style={{ minWidth: 200 }} align="left">
                Решение
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {validTasks?.map(task => (
              <DesktopTaskItem
                key={task._id}
                task={task}
                openEditForm={openEditForm}
                deleteTasks={deleteTasks}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button
        className='desktop-tasks-page__add-btn'
        onClick={openAddForm}
      >
        Добавить новую задачу
      </button>
      {isOpenAddForm && <AddNewTasks onClose={closeAddForm} />}
      {changeTask.isOpen && <AddNewTasks onClose={closeEditForm} prevTask={changeTask.task} />}
      {loading && <MiniPreloader />}
    </section>
  )
}

export default TasksPageDesktop
