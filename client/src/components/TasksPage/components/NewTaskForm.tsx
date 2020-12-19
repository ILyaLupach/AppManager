import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { PersonType, TaskFile, TasksType, WorkshopsType } from '../../../types/global';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import { StoreType } from '../../../types/store';
import { FormControl, Input, InputLabel, ListItemText, Select, Checkbox, MenuItem, Box } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { CompletedMessage, ValidateError } from '../../shared/Message'
import { createNewTask, updateTask } from '../../../actions/tasksActions'
import FileInput from '../../shared/InputFiles';
import PrevFileItem from 'src/components/shared/InputFiles/PrevFileItem';
import api from 'src/api';

type Props = {
  onClose: () => void
  prevTask?: TasksType | null
}

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    paddingTop: 5,
    '& > *': {
      margin: theme.spacing(1),
      width: "95%"
    },
  },
}))

const AddNewTasks = ({ onClose, prevTask }: Props) => {
  const defaultDate = new Date()
  const classes = useStyles()
  const dispatch = useDispatch()
  const NameList = useSelector(({ persons }: StoreType) => persons.persons)
  const workshopsList = useSelector(({ workshops }: StoreType) => workshops.workshops)
  const { isSendingTask, showCompletedMessage } = useSelector(({ tasks }: StoreType) => tasks)
  const [validateError, setValidateError] = useState(false)
  const [prevFilesList, setPrevFilesList] = useState(prevTask?.files || [])
  const [task, setTask] = useState<TasksType>({
    date: prevTask?.date ? new Date(prevTask.date) : defaultDate,
    name: prevTask?.name || [],
    failure: prevTask?.failure || '',
    fix: prevTask?.fix || '',
    start: prevTask?.start ? new Date(prevTask?.start) : defaultDate,
    finish: prevTask?.start ? new Date(prevTask?.finish) : defaultDate,
    position: prevTask?.position || '',
    object: prevTask?.object || '',
    _id: prevTask?._id || null,
    files: [],
  })

  useEffect(() => {
    showCompletedMessage && setTimeout(() => onClose(), 2000)
  }, [showCompletedMessage])

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
  const handleFiles = (files: File[] = []) => {
    setTask({ ...task, files: files })
  }
  const removeFileFromPrevList = async (file: TaskFile) => {
    await api.removeFile(String(task._id), file.name)
    setPrevFilesList((prevFilesList as TaskFile[])?.filter(({ name }) => name !== file.name))
  }

  const onCreateNewTask = async () => {
    const { date, name, failure, fix, start, finish, position, object } = task
    if (!prevTask && date && name && failure && fix && start && finish && position && object) {
      dispatch(createNewTask(task))
    } else {
      setValidateError(true)
      setTimeout(() => {
        setValidateError(false)
      }, 2000)
    }
  }

  const onEditTask = async () => {
    const { date, name, failure, fix, start, finish, position, object } = task
    if (date || name || failure || fix || start || finish || position || object) {
      prevTask?._id && dispatch(updateTask(task, prevFilesList))
    } else {
      setValidateError(true)
      setTimeout(() => {
        setValidateError(false)
      }, 2000)
    }
  }

  const onTaskAction = () => {
    if (showCompletedMessage) {
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
        setTask({ ...task, failure: event.target.value })
        break
      case "fix":
        setTask({ ...task, fix: event.target.value })
        break
    }
  }

  return (
    <Dialog
      className={(!validateError && !showCompletedMessage) ? 'add-task-form' : undefined}
      disableBackdropClick
      disableEscapeKeyDown
      open={true}
      onClose={onClose}
    >
      {(!validateError && !showCompletedMessage) && (
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
            <FormControl>
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
                {(NameList as PersonType[]).map(({ _id, name, surname }, i) => (
                  <MenuItem key={_id || i} value={`${surname} ${name}`}>
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
                  {(workshopsList as WorkshopsType[]).map((item, i) => (
                    <MenuItem value={item.name} key={item._id || i}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                className='add-task-form__position add-task-form__position_second'
              >
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  value={task.object}
                  className='add-task-form__position-autocomplete'
                  onChange={(event: any, newValue: string | null) => {
                    handleObject(newValue)
                  }}
                  onInputChange={(event, newInputValue) => {
                    handleObject(newInputValue)
                  }}
                  options={
                    (!task.position || !workshopsList.length) ? [] :
                      workshopsList.filter((item) => item.name === task.position)[0]?.object.map(str => str[0].toUpperCase() + str.slice(1)).sort()
                  }
                  renderInput={(params: any) => (
                    <TextField {...params} label='Объект' id="standard-basic" fullWidth />
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
            <Box className="input-file__files-list">
              {!!prevFilesList?.length && !!task._id &&
                (prevFilesList as TaskFile[]).map(item => (
                  <PrevFileItem
                    key={item.name}
                    file={item}
                    dir={String(task._id)}
                    removeFile={removeFileFromPrevList}
                  />
                ))
              }
            </Box>
            <FileInput onChooseFiles={handleFiles} multiple={true} />
          </form>
        </DialogContent>
      )}
      {validateError && <ValidateError />}
      {showCompletedMessage && <CompletedMessage isUpdate={!!prevTask} />}
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={validateError}>
          Cancel
          </Button>
        <Button onClick={onTaskAction} color="primary" disabled={isSendingTask}>
          Ok
          </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddNewTasks
