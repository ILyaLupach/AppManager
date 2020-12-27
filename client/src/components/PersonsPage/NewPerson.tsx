import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import { Box } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { createNewPerson, updatePerson } from '../../actions/personsActions'
import { PersonType } from '../../types/global'
import api from '../../api'
import { ComplitedPerson, AlarmPerson } from '../shared/Message'
import FileInput from '../shared/InputFiles'
import useStyles from './styles'
import PrevAvatar from './PrevAvatar'

type Props = {
  onClose: () => void
  person?: PersonType
}

const NewPerson = ({ person, onClose }: Props) => {
  const classes = useStyles()
  const [completed, setCompleted] = useState(false)
  const [validateError, setValidateError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [prevAvatar, setPrevAvatar] = useState(person?.avatar || '')
  const [newPerson, setNewPerson] = useState({
    name: person?.name || '',
    surname: person?.surname || '',
    phone: person?.phone || '',
    position: person?.position || '',
    avatar: person?.avatar || ''
  })
  const [avatar, setAvatar] = useState<File | null>(null)
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
      const { error, person } =
        await api.addNewPerson({ ...newPerson, avatar: avatar ? avatar.name : '' })
        avatar && await api.uploadFile(avatar, person._id)
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
    const { name, surname, phone, position, avatar: prevAvatar } = newPerson
    setLoading(true)
    if (
      name !== person?.name ||
      surname !== person?.surname ||
      phone !== person.phone ||
      position !== person.position ||
      prevAvatar !== person.avatar
    ) {
      if (avatar !== person?.avatar && person?._id && person?.avatar) {
        await api.removeFile(String(person._id), person.avatar)
      }
      const { error, body } = await api.updateData('persons', person?._id, newPerson)
      avatar && person?._id && await api.uploadFile(avatar, String(person._id))
      if (body) {
        dispatch(updatePerson(body))
        setCompleted(true)
        setLoading(false)
        setTimeout(() => {
          setCompleted(false)
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

  const removeFileFromPrevList = async (file: string) => {
    if (!person?._id) return
    setNewPerson({
      ...newPerson,
      avatar: ''
    })
    setPrevAvatar('')
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

  const handleFiles = (file: File[]) => {
    if (!file?.length) return
    setAvatar(file[0])
    setNewPerson({
      ...newPerson,
      avatar: file[0].name
    })
    setPrevAvatar('')
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open
    >
      {(!validateError && !completed) && (
        <DialogContent>
          <form className={classes.rootPopup} noValidate autoComplete="off">
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
            <Box className="input-file__files-list">
              {person?._id && prevAvatar &&
                <PrevAvatar
                  name={prevAvatar}
                  dir={String(person._id)}
                  removeFile={removeFileFromPrevList}
                />
              }
            </Box>
            <FileInput
              onChooseFiles={handleFiles}
              text={prevAvatar ? 'Изменить аватар' : 'Добавить аватар'}
              accept='image/*'
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
