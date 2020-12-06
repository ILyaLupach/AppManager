import React from 'react'
import { Box, Button, ListItemIcon, ListItemText, ListItem, Tooltip, createStyles, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { StoreType } from '../../../types/store'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded'
import { authOpen } from '../../../utils/location'
import { logOut } from '../../../actions/authActions'

const useStyles = makeStyles(() =>
  createStyles({
    item: { marginTop: 30 },
    btn: { padding: 0, textTransform: 'none', color: 'rgba(0, 0, 0, 0.9) !important' }
  })
)

const Acces = () => {
  const classes = useStyles()
  const { isGuest, user } = useSelector(({ user }: StoreType) => user)
  const access = user?.acces === 'admin' || user?.acces === 'standard'
  return (
    <>
      {!access && (
        <Tooltip
          className={classes.item}
          title="Ваши права ограничены администратором, войдите или зарегистрируйтесь и дождитесь пока администратор добавит вам все необходимые права"
          placement="top-end"
          enterDelay={500}
          leaveDelay={100}
        >
          <Box>
            <Button
              disabled
              className={classes.btn}
            >
              <ListItem button disabled>
                <ListItemIcon><LockOutlinedIcon /></ListItemIcon>
                <ListItemText primary='Только чтение' />
              </ListItem>
            </Button>
          </Box>
        </Tooltip>
      )}
      <ListItem button onClick={isGuest ? authOpen : logOut}>
        <ListItemIcon><AccountBoxRoundedIcon color='inherit' /></ListItemIcon>
        <ListItemText primary={isGuest ? 'Войти/Регистрация' : 'Выйти'} />
      </ListItem>
    </>
  )
}

export default Acces
