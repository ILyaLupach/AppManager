import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { PersonType, TasksType, WorkshopsType } from '../../../types/global';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import { StoreType } from '../../../types/store';
import { FormControl, Input, InputLabel, ListItemText, Select, Checkbox, MenuItem, InputBase } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import { CompletedMessage, ErrorMessage, ValidateError } from '../../shared/Message';
import { getAllPersons } from '../../../actions/personsActions';
import api from '../../../api';
import { getAllTasks } from '../../../actions/tasksActions';

type Props = {
  onClose: () => void
  prevTask?: TasksType | null
}

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    overflow: 'hidden',
    paddingTop: 5,
    '& > *': {
      margin: theme.spacing(1),
      width: "95%"
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '30%',
  },
}));

const defaultDate = new Date()

const AddNewTasks = ({ onClose, prevTask }: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const NameList: PersonType[] =
    useSelector(({ persons }: StoreType) => persons.persons)
  const workshopsList: WorkshopsType[] =
    useSelector(({ workshops }: StoreType) => workshops.workshops)

  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [validateError, setValidateError] = useState(false)
  const [error, setError] = useState(false)

  const [task, setTask] = useState<TasksType>({
    date: prevTask?.date ? new Date(prevTask.date) : defaultDate,
    name: prevTask?.name || [],
    failure: prevTask?.failure || '',
    fix: prevTask?.fix || '',
    start: prevTask?.start ? new Date(prevTask?.start) : defaultDate,
    finish: prevTask?.start ? new Date(prevTask?.finish) : defaultDate,
    position: prevTask?.position || '',
    object: prevTask?.object || '',
  })

  useEffect(() => {
    !NameList.length && dispatch(getAllPersons())
  }, [])

  const handlePersons = (event: React.ChangeEvent<{ value: string[] | unknown }>) => {
    const value = event.target.value as string[] | null
    setTask({ ...task, name: value || [] })
  }
  const handleDateChange = (date: Date) => {
    setTask({ ...task, date: date })
  }
  const handleStartChange = (date: Date) => {
    setTask({ ...task, start: date })
  }
  const handleFinishChange = (date: Date) => {
    setTask({ ...task, finish: date })
  }
  const handlePosition = (event: React.ChangeEvent<{ value: string | unknown }>) => {
    const value = event.target.value as string | null
    setTask({ ...task, position: value || '' })
  }
  const handleObject = (object: string | null) => {
    setTask({ ...task, object: object || '' })
  }

  const onCreateNewTask = async () => {
    setLoading(true)
    const { date, name, failure, fix, start, finish, position, object } = task
    if (!prevTask && date && name && failure && fix && start && finish && position && object) {
      const { task: newTask, error } =
        await api.createNewTasks({ ...task, position: 'qwe', object: 'qwe-qwe' })
      if (newTask) {
        dispatch(getAllTasks())
        setLoading(false)
        setCompleted(true)
        setTimeout(() => {
          setCompleted(false)
          onClose()
        }, 2000)
      }
    } else {
      setLoading(false)
      setValidateError(true)
      setTimeout(() => {
        setValidateError(false)
      }, 2000)
    }
  }

  const onEditTask = async () => {
    const { date, name, failure, fix, start, finish, position, object } = task
    if (!prevTask) return
    // setLoading(true)
    if (date || name || failure || fix || start || finish || position || object) {
      const body = await api.updateData('tasks', prevTask?._id, task)
      if (true) {
        dispatch(getAllTasks())
      }
      if (false) onClose()
    } else {
      // setValidateError(true)
      // setTimeout(() => {
      //   setValidateError(false)
      //   setLoading(false)
      // }, 2000)
    }
  }

  const onTaskAction = () => {
    if (completed) {
      onClose()
      return
    }
    if (validateError) {
      setValidateError(false)
      return
    }
    prevTask ? onEditTask() : onCreateNewTask()
  }

  const handleChangeText = (event: any) => {
    switch (event.target.id) {
      case "failure":
        setTask({
          ...task,
          failure: event.target.value
        });
        break;
      case "fix":
        setTask({
          ...task,
          fix: event.target.value
        })
        break;
      default: break;
    }
  }

  return (
    <>
      <Dialog
        className={(!validateError && !error && !completed) ? 'add-task-form' : undefined}
        disableBackdropClick
        disableEscapeKeyDown
        open={true}
        onClose={onClose}
      >
        {(!validateError && !error && !completed) && (
          <DialogContent>
            <form className={classes.root} noValidate autoComplete="off">
              <div
                className='add-task-form__date-picker-wrapper add-task-form__date-picker-wrapper_first'
              >
                <DatePicker
                  selected={task.date}
                  onChange={(date: Date) => handleDateChange(date)}
                  locale='ru'
                  dateFormat='dd.MM.yyyy'
                  className='add-task-form__date-picker add-task-form__date-picker_first'
                />
              </div>

              <div className="add-task-form__date-picker-container">
                <div className='add-task-form__date-picker-wrapper'>
                  <span className='add-task-form__date-picker-text'>Приступил</span>
                  <DatePicker
                    selected={task.start}
                    onChange={(date: Date) => handleStartChange(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={10}
                    timeFormat="HH:mm"
                    timeCaption="Time"
                    dateFormat='HH:mm   dd.MM.yy'
                    className='add-task-form__date-picker'
                  />
                </div>
                <div className='add-task-form__date-picker-wrapper'>
                  <span className='add-task-form__date-picker-text'>Завершил</span>
                  <DatePicker
                    selected={task.finish}
                    onChange={(date: Date) => handleFinishChange(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={10}
                    timeFormat="HH:mm"
                    timeCaption="Time"
                    dateFormat='HH:mm   dd.MM.yy'
                    className='add-task-form__date-picker'
                  />
                </div>
              </div>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">
                  Исполнитель(ли)
              </InputLabel>
                <Select
                  labelId="demo-mutiple-checkbox-label"
                  id="demo-mutiple-checkbox"
                  multiple
                  value={task.name}
                  onChange={handlePersons}
                  input={<Input />}
                  renderValue={(selected) => (selected as string[]).join(', ')}
                >
                  {NameList.map(({ _id, name, surname }) => (
                    <MenuItem key={_id} value={`${surname} ${name}`}>
                      <Checkbox
                        checked={(task.name as string[]).indexOf(`${surname} ${name}`) > -1}
                        color="primary"
                      />
                      <ListItemText primary={`${surname} ${name}`} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div className="add-task-form__position-wrapper">
                <FormControl className='add-task-form__position'>
                  <InputLabel id="demo-customized-select-label">Цех</InputLabel>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-mutiple-checkbox"
                    value={task.position}
                    onChange={handlePosition}
                    input={<Input />}
                  >
                    {workshopsList.map((item) => (
                      <MenuItem value={item.name} key={item._id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  className='add-task-form__position add-task-form__position_second'
                >
                  <Autocomplete
                    id="combo-box-demo"
                    className='add-task-form__position-autocomplete'
                    debug
                    onChange={(event: any, newValue: string | null) => {
                      handleObject(newValue)
                    }}
                    onInputChange={(event, newInputValue) => {
                      handleObject(newInputValue)
                    }}
                    options={
                      !task.position ? [] :
                        workshopsList.filter((item) => item.name === task.position)[0]?.object.map(str => str[0].toUpperCase() + str.slice(1)).sort()}
                    getOptionLabel={(option: any) => option}
                    style={{
                      width: "45vw"
                    }}
                    renderInput={(params: any) => (
                      <TextField {...params} id="standard-basic" fullWidth />
                    )}
                  />
                </FormControl>
              </div>

              <TextField
                value={task.failure}
                onChange={handleChangeText}
                id="failure"
                label="Описание проблемы"
              />
              <TextField
                value={task.fix}
                onChange={handleChangeText}
                multiline
                id='fix'
                rows="4"
                label="Принятые меры"
              />
            </form>
          </DialogContent>
        )}
        {validateError && <ValidateError />}
        {error && <ErrorMessage />}
        {completed && <CompletedMessage />}
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onTaskAction} color="primary" disabled={loading}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddNewTasks
