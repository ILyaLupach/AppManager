import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { withStyles, Theme } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { TaskFile, TasksType } from '../../../types/global'
import { formatTime } from '../../../utils/formatTime'
import { Button, ButtonGroup } from '@material-ui/core'
import api from '../../../api'
import { removeTask } from '../../../actions/tasksActions'
import { useDispatch, useSelector } from 'react-redux'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { StoreType } from '../../../types/store'
import FilesDialog from './FilesDialog'
import EditIcon from '@material-ui/icons/Edit'

type Props = {
  task: TasksType
  openEditForm: (task: TasksType) => void
}

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

const DesktopTaskItem = ({ task, openEditForm }: Props) => {
  const [showChangePanel, setShowChangePanel] = useState(false)
  const [checked, setChecked] = useState(task.mark || false)
  const { acces } = useSelector(({ user }: StoreType) => user)
  const thisRef = useRef<any>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      document.removeEventListener('click', handleOuterClick)
      document.removeEventListener('mouseover', handleOuterClick)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const removeItem = async () => {
    task._id && dispatch(removeTask(task._id))
  }

  const handleOuterClick = (event: { target: any }) => {
    if (!thisRef?.current?.contains(event.target)) {
      closeChangePanel()
    }
  }

  const openChangePanel = () => {
    if (acces === 'read-only') return
    setShowChangePanel(true)
    document.addEventListener('click', handleOuterClick)
    document.addEventListener('mouseover', handleOuterClick)
  }
  const closeChangePanel = () => {
    setShowChangePanel(false)
    document.removeEventListener('click', handleOuterClick)
    document.removeEventListener('mouseover', handleOuterClick)
  }

  const toggleChecked = async () => {
    const { body } = await api.updateData('tasks', task._id, { mark: !checked })
    body && setChecked(body.mark)
  }

  return (
    <StyledTableRow
      ref={thisRef}
      onClick={openChangePanel}
      className={clsx(
        'desktop-tasks-page__item',
        showChangePanel && 'desktop-tasks-page__item_active',
        checked && 'desktop-tasks-page__item_checked'
      )}
    >
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
        {task.fix} <br />
        {!!task.files && !!task._id &&
          <FilesDialog dir={task._id} files={(task.files as TaskFile[])} />
        }
      </StyledTableCell>
      <StyledTableCell align="left" width={0} className='desktop-tasks-page__item-actions'>
        <ButtonGroup
          size="small"
          aria-label="small outlined button group"
          className='desktop-tasks-page__item-actions-btns'
          variant="contained"
        >
          <Button
            className='desktop-tasks-page__item-actions-btn'
            onClick={toggleChecked}
          >
            <ErrorOutlineIcon />
          </Button>
          <Button
            className='desktop-tasks-page__item-actions-btn'
            onClick={() => openEditForm(task)}
          >
            <EditIcon />
          </Button>
          <Button
            className='desktop-tasks-page__item-actions-btn'
            onClick={removeItem}
          >
            <DeleteForeverIcon />
          </Button>
        </ButtonGroup>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default DesktopTaskItem
