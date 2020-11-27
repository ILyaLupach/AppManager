import React, { useEffect } from 'react'
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

import './TasksPage.scss'

import { StoreType, FilterStoreType, TasksStoreType } from '../../types/store'
import { TasksType } from '../../types/global'

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

const StyledTableRow = withStyles((theme: Theme) => ({
  root: {
    height: '100%',
    '&:nth-of-type(odd)': {
      backgroundColor: 'rgba(231, 231, 231, .3)',
    },
    '&:hover': {
      backgroundColor: '#d4f7ff',
    },
  },
}))(TableRow)

const TasksPageDesktop: React.FC = () => {
  const { tasks, loading }: TasksStoreType = useSelector(({ tasks }: StoreType) => tasks)
  const { filterBy, searchQuery }: FilterStoreType =
    useSelector(({ filter }: StoreType) => filter)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllTasks())
  }, [])

  const formatTime = (time: number): string => {
    if (time < 10) {
      return "0" + time
    }
    else return '' + time
  }

  const validTasks: TasksType[] | null =
    sortBy(_.orderBy(tasks, ['date'], ['desc']), filterBy, searchQuery)

  return loading ? <MiniPreloader /> : (
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
              <StyledTableRow key={task._id} onDoubleClick={() => console.log(task)}>
                <StyledTableCell align="left">
                  <strong>
                    {`${formatTime(new Date(task.date).getDate())}/${formatTime(new Date(task.date).getMonth() + 1)}/${new Date(task.date).getFullYear()}`}
                  </strong> &nbsp;&nbsp;
                                    <span>
                    {`${formatTime(new Date(task.start).getHours())}:${formatTime(new Date(task.start).getMinutes())} - ${formatTime(new Date(task.finish).getHours())}:${formatTime(new Date(task.finish).getMinutes())}`}
                  </span>
                </StyledTableCell>
                <StyledTableCell align="left">
                  {task.name.join(", ")}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {`${task.position} (${task.object})`}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {task.failure}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {task.fix}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button className='desktop-tasks-page__add-btn'>
        Добавить новую задачу
      </button>
    </section>
  )
}

export default TasksPageDesktop
