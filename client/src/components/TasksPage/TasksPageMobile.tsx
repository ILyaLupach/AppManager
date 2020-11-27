import React, { useEffect } from 'react'
import _ from 'lodash'
import { Accordion } from '@material-ui/core';
import { AccordionSummary } from '@material-ui/core';
import { AccordionDetails } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import sortBy from '../../utils/sortBy'
import { getAllTasks } from '../../actions'
import { FilterStoreType, StoreType, TasksStoreType } from '../../types/store'
import { TasksType } from '../../types/global'
import sizeArr from '../../utils/sizeArr'

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const { tasks, loading }: TasksStoreType = useSelector(({ tasks }: StoreType) => tasks)
  const { filterBy, searchQuery }: FilterStoreType =
    useSelector(({ filter }: StoreType) => filter)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllTasks())
  }, [])

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const formatTime = (time: number): string => {
    if (time < 10) {
      return "0" + time
    }
    else return '' + time
  }

  const validTasks: TasksType[] | null =
    sortBy(_.orderBy(sizeArr(tasks, 50), ['date'], ['desc']), filterBy, searchQuery)

  const getTimeWork = (start: Date, finish: Date) => {
    const timeStart = `${formatTime(new Date(start).getHours())}:${formatTime(new Date(start).getMinutes())}`
    const timeFinish = `${formatTime(new Date(finish).getHours())}:${formatTime(new Date(finish).getMinutes())}`
    return `${timeStart} - ${timeFinish}`
  }

  return (
    <div className='mobile-tasks-page'>
      {validTasks?.map(task => (
        <Accordion
          key={task._id}
          onChange={handleChange(`panel${task._id}`)}
          className='mobile-tasks-page__task'
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
            <span className='mobile-tasks-page__subtitle'> Неисправность: </span>
            <span className=''>{task.failure}</span>
            <span className='mobile-tasks-page__subtitle'> Корректирующие действия: </span>
            <span className=''>{task.failure}</span>
          </AccordionDetails>
        </Accordion>
      ))}
      <button className='mobile-tasks-page__add-btn'>
        Добавить новую задачу
      </button>
    </div >
  );
}
