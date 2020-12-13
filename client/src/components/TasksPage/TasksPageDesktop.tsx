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
import { MiniPreloader } from '../Preloader'
import { StoreType, FilterStoreType, TasksStoreType } from '../../types/store'
import { TasksType } from '../../types/global'
import AddNewTasks from './components/NewTaskForm'
import { getAllTasks } from '../../actions/tasksActions'
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
  const { acces } = useSelector(({ user }: StoreType) => user)

  const openAddForm = () => setIsOpenAddForm(true)
  const closeAddForm = () => setIsOpenAddForm(false)

  const openEditForm = (task: TasksType) => setChangeTask({ isOpen: true, task })
  const closeEditForm = () => setChangeTask({ isOpen: false, task: null })

  const validTasks: TasksType[] | null =
    sortBy(_.orderBy(tasks, ['date'], ['desc']), filterBy, searchQuery)

  return (
    <section className='page desktop-tasks-page'>
      <TableContainer style={{ height: '100%' }}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: '18%' }} align="left">
                Время
              </StyledTableCell>
              <StyledTableCell style={{ width: '20%' }} align="left">
                Ф.И.О. работников
              </StyledTableCell>
              <StyledTableCell style={{ width: '22%' }} align="left">
                Цех
              </StyledTableCell>
              <StyledTableCell style={{ width: '20%' }} align="left">
                Проблема
              </StyledTableCell>
              <StyledTableCell style={{ width: '20%' }} align="left">
                Решение
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {validTasks?.map((task, i) => (
              <DesktopTaskItem
                key={task._id || i}
                task={task}
                openEditForm={openEditForm}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {acces !== 'read-only' && (
        <button className='desktop-tasks-page__add-btn' onClick={openAddForm}>
          Добавить новую задачу
        </button>
      )}
      {isOpenAddForm && <AddNewTasks onClose={closeAddForm} />}
      {changeTask.isOpen && <AddNewTasks onClose={closeEditForm} prevTask={changeTask.task} />}
      {loading && <MiniPreloader />}
    </section>
  )
}

export default TasksPageDesktop
