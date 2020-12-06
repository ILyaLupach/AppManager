import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { UserType, WorkshopsType } from '../../types/global'
import { StoreType } from '../../types/store'
import api from '../../api'
import { getAllWorkshops } from '../../actions/workshopsActions'
import { isMobileOnly } from 'react-device-detect'
import { Box, Checkbox, Container, Grid, Icon, IconButton, ListItemSecondaryAction, Paper, Typography } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import DeleteIcon from '@material-ui/icons/Delete'
import PasswordSettings from './components/PasswordSettings';
import useStyles from './styles';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

const SettingsPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { acces } = useSelector(({ user }: StoreType) => user)
  const [isOpenPasswordInput, setOpenPasswordInput] = useState(acces !== 'admin')
  const workshopsList = useSelector(({ workshops }: StoreType) => workshops.workshops)
  const [newObject, setNewObject] =
    useState<{ workshop: number | undefined, object: string }>({ workshop: 0, object: '' })
  const [workShopsName, setWorkShopsName] = useState('')
  const [loading, setLoading] = useState(false)

  const [allUsers, setUsers] = useState<UserType[]>([])

  useEffect(() => {
    !workshopsList && dispatch(getAllWorkshops())
    getAllUsers()
  }, [])

  const getAllUsers = async () => {
    const users = await api.getAllUsers()
    users && setUsers(users)
  }

  const addNewWorkshop = async () => {
    if (workShopsName && workShopsName.length > 3 && !loading) {
      setLoading(true)
      const { workshop } = await api.addNewWorkshops({ name: workShopsName, object: [] })
      if (workshop) dispatch(getAllWorkshops())
      setLoading(false)
    }
  }

  const deletedPosition = async (id?: string | number) => {
    if (loading && !id) return
    setLoading(true)
    await api.deleteItem(id, 'workshops')
    setLoading(false)
  }

  const deletedObject = async (workshop: WorkshopsType, i: number) => {
    if (loading) return
    setLoading(true)
    const newWorkShop = workshop.object.filter((_: any, id: any) => id !== i);
    await api.updateData("workshops", workshop._id, { object: newWorkShop })
    dispatch(getAllWorkshops())
    setLoading(false)
  }

  const addNewObject = async (workshop: WorkshopsType) => {
    if (workshop._id === newObject.workshop && newObject.object && !loading) {
      setLoading(true)
      const newObjectList = [...workshop.object, newObject.object]
      await api.updateData("workshops", workshop._id, { object: newObjectList })
      setNewObject({ object: '', workshop: undefined })
      dispatch(getAllWorkshops())
      setLoading(false)
    }
  }

  const toggleChecked = async (id: string, acces: 'read-only' | 'standard' | 'admin') => {
    const idx = allUsers.findIndex((el) => el._id === id)
    if (loading || allUsers[idx].acces === acces) return
    setLoading(true)
    const { body } = await api.updateData('settings/users', id, { acces })
    const newUsersList = [...allUsers]
    newUsersList[idx] = body
    setUsers(newUsersList)
    setLoading(false)
  }

  return (
    <Box component='section' className={isMobileOnly ? 'mobile-page' : 'page'}>
      {isOpenPasswordInput ? <PasswordSettings onClose={() => setOpenPasswordInput(false)} /> : (
        <Container maxWidth='md'>
          <Grid container spacing={6} className={classes.container}>
            <Grid item xs={12} md={6} className={classes.gridContainer}>
              <Paper component="form" className={classes.root}>
                <InputBase
                  className={classes.input}
                  placeholder="Добавить новый цех"
                  onChange={e => setWorkShopsName(e.target.value)}
                  value={workShopsName}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton
                  color="primary"
                  className={classes.iconButton}
                  aria-label="directions"
                  onClick={addNewWorkshop}
                >
                  <Icon color="primary">add_circle</Icon>
                </IconButton>
              </Paper>
              <Typography variant='h5' component='h4'>
                Список объектов
              </Typography>
              {(workshopsList as WorkshopsType[]).map(workshop => (
                <List key={workshop._id}>
                  <ListItem>
                    <Typography variant="h6">
                      {workshop.name}
                    </Typography>
                    <ListItemSecondaryAction>
                      <IconButton
                        edge='end'
                        aria-label="delete"
                        onClick={() => deletedPosition(workshop._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <List>
                    {workshop.object.map((item, i) => (
                      <ListItem key={i}>
                        <ListItemText
                          primary={item}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => deletedObject(workshop, i)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                  <Paper component="form" className={classes.root}>
                    <InputBase
                      className={classes.input}
                      placeholder="Добавить новый объект"
                      value={newObject.workshop === workshop._id ? newObject.object : ''}
                      onChange={e => setNewObject({ object: e.target.value, workshop: workshop._id })}
                    />
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton
                      color="primary"
                      className={classes.iconButton}
                      aria-label="directions"
                      onClick={() => addNewObject(workshop)}
                    >
                      <Icon color="primary">add_circle</Icon>
                    </IconButton>
                  </Paper>
                </List>
              ))}
            </Grid>
            <Grid item xs={12} md={6} className={classes.gridContainer}>
              <Paper component="form" className={classes.root}>
                <InputBase
                  className={classes.input}
                  placeholder="Найти пользователя"
                  onChange={e => setWorkShopsName(e.target.value)}
                  value={workShopsName}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton
                  color="primary"
                  className={classes.iconButton}
                  aria-label="directions"
                  onClick={addNewWorkshop}
                >
                  <SearchOutlinedIcon />
                </IconButton>
              </Paper>
              <Typography variant='h5' component='h4' id='1qwerty'>
                Список пользователей
                </Typography>
              <List dense className={classes.list}>
                {!!allUsers.length && allUsers.map(({ _id, name, email, acces }) => {
                  const labelId = `checkbox-list-secondary-label-${email}`
                  console.log(email, acces)
                  return (
                    <ListItem key={_id} button>
                      <ListItemText
                        id={labelId}
                        primary={`${email} (${name})`}
                        className={classes.userText}
                      />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge="end"
                          checked={acces === 'read-only'}
                          onChange={() => toggleChecked(_id, 'read-only')}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                        <Checkbox
                          edge="end"
                          checked={acces === 'standard'}
                          onChange={() => toggleChecked(_id, 'standard')}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                        <Checkbox
                          edge="end"
                          checked={acces === 'admin'}
                          onChange={() => toggleChecked(_id, 'admin')}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  )
}

export default SettingsPage
