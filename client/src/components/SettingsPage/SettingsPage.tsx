import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { WorkshopsType } from '../../types/global';
import { StoreType } from '../../types/store';
import api from '../../api';
import { getAllWorkshops } from '../../actions/workshopsActions';
import { isMobileOnly } from 'react-device-detect';
import { Box, Container, Grid, Icon, IconButton, ListItemSecondaryAction, Paper, Typography } from '@material-ui/core';
import { Theme, createStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: 50,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    title: {
      margin: 20,
      textAlign: 'right',
    },
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: 40,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const SettingsPage = () => {
  const classes = useStyles();
  const workshopsList: WorkshopsType[] =
    useSelector(({ workshops }: StoreType) => workshops.workshops)
  const dispatch = useDispatch()
  const [workShopsName, setWorkShopsName] = useState('')
  const [newObject, setNewObject] =
    useState<{ workshop: number | undefined, object: string }>({ workshop: 0, object: '' })

  useEffect(() => {
    !workshopsList && dispatch(getAllWorkshops())
  }, [])

  const addNewWorkshop = async () => {
    if (workShopsName && workShopsName.length > 3) {
      const { workshop } = await api.addNewWorkshops({ name: workShopsName, object: [] })
      if (workshop) dispatch(getAllWorkshops())
    }
  }

  const deletedPosition = (id?: string | number) => {
    id && api.deleteItem(id, 'workshops');
    setTimeout(() => {
      dispatch(getAllWorkshops())
    }, 1000)
  }

  const deletedObject = async (workshop: WorkshopsType, i: number) => {
    const newWorkShop = workshop.object.filter((item: any, id: any) => id !== i);
    await api.updateData("workshops", workshop._id, { object: newWorkShop })
    dispatch(getAllWorkshops())
  }

  const addNewObject = async (workshop: WorkshopsType) => {
    console.log(newObject, workshop)
    if (workshop._id === newObject.workshop && newObject.object) {
      const newObjectList = [...workshop.object, newObject.object]
      await api.updateData("workshops", workshop._id, { object: newObjectList })
      setNewObject({ object: '', workshop: undefined })
      dispatch(getAllWorkshops())
    }
  }

  return (
    <Box component='section' className={isMobileOnly ? 'mobile-page' : 'page'}>
      <Typography variant='h4' component='h2' className={classes.title}>
        Настройки
        </Typography>
      <Container maxWidth='md' className={classes.container}>
        <Grid item xs={12} md={6}>
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
        </Grid>
        {workshopsList.map((workshop: WorkshopsType) => (
          <Grid item xs={12} md={6} key={workshop._id} style={{ marginTop: '20px' }}>
            <List>
              <ListItemSecondaryAction>
                <IconButton
                  edge='end'
                  aria-label="delete"
                  onClick={() => deletedPosition(workshop._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
              <Typography variant="h6">
                {workshop.name}
              </Typography>
            </List>
            <Box component='div' className={classes.demo}>
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
            </Box>
          </Grid>
        ))}
      </Container>
    </Box>
  )
}


export default SettingsPage
