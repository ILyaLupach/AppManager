import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../api'

type Props = {
  onClose: (isOpen: boolean) => void}

const PasswordSettings = ({ onClose }: Props) => {
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(false)
    setPassword(event.target.value)
  }

  const onSubmitPassword = async () => {
    setPasswordError(false)
    const valid = await api.checkSettingsPassword(password)
    if (!valid) {
      setPasswordError(true)
      return
    }
    valid && onClose(false)
  }

  return (
    <Dialog
      open
      aria-labelledby="form-dialog-title"
      maxWidth='xs'
    >
      <DialogTitle id="form-dialog-title">Настройки приложения</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Для доступа к панели настроек введите пароль
      </DialogContentText>
        <TextField
          error={passwordError}
          autoFocus
          margin="dense"
          id="password"
          label={passwordError ? "Неверный пароль" : "Введите пароль..."}
          type="password"
          fullWidth
          value={password}
          onChange={handleChangePassword}
        />
      </DialogContent>
      <DialogActions>
        <Link to='/'>
          <Button color="primary">Назад</Button>
        </Link>
        <Button onClick={onSubmitPassword} color="primary">
          Подтвердить
      </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PasswordSettings
