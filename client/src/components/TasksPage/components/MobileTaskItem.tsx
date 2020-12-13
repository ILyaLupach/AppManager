import { Accordion, AccordionDetails, AccordionSummary, Button, DialogActions, FormControlLabel, Switch } from '@material-ui/core'
import clsx from 'clsx'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTask } from '../../../actions/tasksActions'
import api from '../../../api'
import { TasksType } from '../../../types/global'
import { StoreType } from '../../../types/store'
import { getTimeWork } from '../../../utils/formatTime'

type Props = {
  task: TasksType
  openEditForm: (task: TasksType) => void
}

const MobileTaskItem = ({ task, openEditForm }: Props) => {
  const { acces } = useSelector(({ user }: StoreType) => user)
  const [checked, setChecked] = useState(task.mark || false)
  const dispatch = useDispatch()

  const toggleChecked = async () => {
    const { body } = await api.updateData('tasks', task._id, { mark: !checked })
    body && setChecked(body.mark)
  }

  const removeItem = async () => {
    task._id && dispatch(removeTask(task._id))
  }

  return (
    <Accordion
      className={clsx('mobile-tasks-page__task', checked && 'mobile-tasks-page__task_checked')}
    >
      <AccordionSummary>
        <div className='mobile-tasks-page__header'>
          <span className='mobile-tasks-page__time'>
            {getTimeWork(task.start, task.finish)}
          </span>
          <span className='mobile-tasks-page__position'>{task.position}</span>
          <span className='mobile-tasks-page__object'>{task.object}</span>
          <span className='mobile-tasks-page__person'>{task.name.join(", ")}</span>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className='mobile-tasks-page__details-wrapper'>
          <span className='mobile-tasks-page__subtitle'> Неисправность: </span>
          <span className='mobile-tasks-page__text'>{task.failure}</span>
          <span className='mobile-tasks-page__subtitle'> Корректирующие действия: </span>
          <span className='mobile-tasks-page__text'>{task.fix}</span>
        </div>
      </AccordionDetails>
      {acces !== 'read-only' && (
        <DialogActions>
        <FormControlLabel
          control={<Switch checked={checked} onChange={toggleChecked} />}
          label={
            <Button color="primary" onClick={toggleChecked}>
              <h5>отметить</h5>
            </Button>}
        />
        <Button onClick={() => openEditForm(task)} color="primary">
          <h5>редактировать</h5>
        </Button>
        <Button onClick={removeItem} color="primary">
          <h5>удалить</h5>
        </Button>
        </DialogActions>
      )}
    </Accordion>
  )
}

export default MobileTaskItem
