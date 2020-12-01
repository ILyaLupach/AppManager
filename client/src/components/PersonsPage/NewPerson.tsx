import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { createNewPerson, updatePerson } from '../../actions/personsActions'
import { PersonType } from '../../types/global'
import api from '../../api'
import { ComplitedPerson, AlarmPerson } from '../shared/Message'

type Props = {
  onClose: () => void
  person?: PersonType
}

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: "95%"
    },
  },
}))

const NewPerson = ({ person, onClose }: Props) => {
  const classes = useStyles()
  const [completed, setCompleted] = useState(false)
  const [validateError, setValidateError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newPerson, setNewPerson] = useState({
    name: person?.name || '',
    surname: person?.surname || '',
    phone: person?.phone || '',
    position: person?.position || '',
  })

  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case "name":
        setNewPerson({
          ...newPerson,
          name: event.target.value
        })
        break;
      case "surname":
        setNewPerson({
          ...newPerson,
          surname: event.target.value
        })
        break;
      case "phone":
        setNewPerson({
          ...newPerson,
          phone: event.target.value
        })
        break;
      case "position":
        setNewPerson({
          ...newPerson,
          position: event.target.value
        })
        break;
      default: break;
    }
  }

  const onCreateNewPerson = async () => {
    const { name, surname, phone, position } = newPerson
    setLoading(true)
    if (name && surname && phone && position) {
      const { error, person } = await api.addNewPerson(newPerson)
      if (person) {
        dispatch(createNewPerson(person))
        setCompleted(true)
        setTimeout(() => {
          setCompleted(false)
          setLoading(false)
          onClose()
        }, 2000)
      }
      if (error) onClose()
    } else {
      setValidateError(true)
      setTimeout(() => {
        setValidateError(false)
        setLoading(false)
      }, 2000)
    }
  }

  const onEditPerson = async () => {
    const { name, surname, phone, position } = newPerson
    setLoading(true)
    if (
      name !== person?.name ||
      surname !== person?.surname ||
      phone !== person.phone ||
      position !== person.position
    ) {
      const { error, body } = await api.updateData('persons', person?._id, newPerson)
      if (body) {
        dispatch(updatePerson(body))
        setCompleted(true)
        setTimeout(() => {
          setCompleted(false)
          setLoading(false)
          onClose()
        }, 2000)
      }
      if (error) onClose()
    } else {
      setValidateError(true)
      setTimeout(() => {
        setValidateError(false)
        setLoading(false)
      }, 2000)
    }
  }

  const onPersonAction = () => {
    if (completed) {
      onClose()
      return
    }
    if (validateError) {
      setValidateError(false)
      return
    }
    person ? onEditPerson() : onCreateNewPerson()
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open
    >
      {(!validateError && !completed) && (
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              value={newPerson.name}
              onChange={handleChange}
              id="name"
              label="Имя"
            />
            <TextField
              value={newPerson.surname}
              onChange={handleChange}
              id="surname"
              label="Фамилия"
            />
            <TextField
              value={newPerson.phone}
              onChange={handleChange}
              id="phone"
              label="Телефон"
            />
            <TextField
              value={newPerson.position}
              onChange={handleChange}
              id="position"
              label="Должность"
            />
          </form>
        </DialogContent>
      )}
      {completed && <ComplitedPerson edit={!!person} />}
      {validateError && <AlarmPerson edit={!!person} />}
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={onPersonAction}
          color="primary"
          disabled={loading}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewPerson
