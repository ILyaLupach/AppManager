import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import { Alert, AlertTitle } from '@material-ui/lab'
import { isMobileOnly } from 'react-device-detect'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: "95%"
    },
  },
}))

const Alarm = () => {
  return (
    <Alert severity="info">
      <AlertTitle>Info</AlertTitle>
        Заполните все поля
    </Alert>
  )
}
const Complited = () => {
  return (
    <Alert severity="success">
      Новый рабочий добавлен
    </Alert>
  )
}

const AddNewPerson = ({ updatePersons, className }: any) => {
  const classes = useStyles()
  // const serv = new ServerKip();
  const [complited, setComplited] = useState(false)
  const [validate, setValidate] = useState(true)

  const [open, setOpen] = useState(false)
  const [newPerson, setNewPerson] = useState({
    name: '',
    surname: '',
    phone: '',
    position: '',
  })

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
  };

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handlePost = () => {
    const { name, surname, phone, position } = newPerson;
    if (name !== "" && surname !== "" && phone !== "" && position !== "") {
      // serv.addNewPerson(newPerson)
      //   .then(res => {
      //     if (res.ok) {
      //       setComplited(true);
      //       updatePersons();
      //       setNewPerson({ name: "", surname: "", phone: "", position: "" })
      //       setTimeout(() => {
      //         setComplited(false);
      //         setOpen(false);
      //       }, 2000);
      //     }
      //   })
      console.log(newPerson)
    } else {
      setValidate(false);
      setTimeout(() => {
        setValidate(true);
      }, 2000);
    }
  };
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <button
        className={isMobileOnly ? 'mobile-tasks-page__add-btn' : 'desktop-tasks-page__add-btn'}
        onClick={handleClickOpen}
      >
        Добавить нового работника
      </button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogContent>
          {complited ? <Complited /> :
            (!validate ? <Alarm /> : (
              <form className={classes.root} noValidate autoComplete="off">
                <TextField onChange={handleChange} id="name" label="Имя" />
                <TextField onChange={handleChange} id="surname" label="Фамилия" />
                <TextField onChange={handleChange} id="phone" label="Телефон" />
                <TextField onChange={handleChange} id="position" label="Должность" />
              </form>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePost} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddNewPerson
