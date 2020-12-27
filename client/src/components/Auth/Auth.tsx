import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Breadcrumbs, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthError, login, signUp } from '../../actions/authActions'
import { clearHash } from '../../utils/location'
import { StoreType } from '../../types/store'

const Auth = ({ location }: RouteComponentProps) => {
  const [open, setOpen] = useState(location.hash === '#auth')
  const [authType, setAuthType] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const { isGuest, error, loading } = useSelector(({ user }: StoreType) => user)
  const dispatch = useDispatch()

  useEffect(() => {
    (location.hash === '#auth' && isGuest) ? setOpen(true) : setOpen(false)
    setEmail('')
    setPassword('')
  }, [location.hash, authType, isGuest])

  useEffect(() => {
    dispatch(setAuthError())
  }, [password, email, authType, dispatch])

  const onSubmit = async () => {
    switch (authType) {
      case 'login':
        if (email.length < 6 || password.length < 6) {
          dispatch(setAuthError('Введите корректные данные'))
          break
        }
        dispatch(login(email, password))
        break
      case 'signup':
        if (email.length < 6 || password.length < 6 || name.length < 4) {
          dispatch(setAuthError('Введите корректные данные'))
          break
        }
        dispatch(signUp(email, password, name))
        break
    }
  }

  return (
    <Dialog open={open} onClose={clearHash} aria-labelledby="form-dialog-title" maxWidth='xs'>
      <DialogTitle id="form-dialog-title">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography
            style={{ cursor: 'pointer' }}
            variant='h6' color={authType === 'login' ? 'textPrimary' : 'inherit'}
            onClick={() => setAuthType('login')}
          >
            Войти
            </Typography>
          <Typography
            style={{ cursor: 'pointer' }}
            variant="h6" color={authType === 'signup' ? 'textPrimary' : 'inherit'}
            onClick={() => setAuthType('signup')}
          >
            Регистрация
            </Typography>
        </Breadcrumbs>
      </DialogTitle>
      <DialogContent>
        {error && (
          <Typography variant="subtitle1" color='error'>
            {error}
          </Typography>
        )}
        <TextField
          autoFocus
          error={!!error}
          margin="dense"
          id="email"
          label="Введите почту или телефон"
          type="email"
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {authType === 'signup' && (<TextField
          error={!!error}
          margin="dense"
          id="name"
          label="Идентификатор (фамилия и имя)"
          type="name"
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
        />)}
        <TextField
          error={!!error}
          margin="dense"
          id="mail"
          label="Пароль"
          type="password"
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={clearHash} color="primary">
          Отменить
          </Button>
        <Button onClick={onSubmit} color="primary" disabled={!!error || loading}>
          Подтвердить
          </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withRouter(Auth)
