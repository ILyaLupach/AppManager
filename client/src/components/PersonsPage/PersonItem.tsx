import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import NewPerson from './NewPerson';
import api from '../../api';
import { useDispatch } from 'react-redux';
import Avatar from './Avatar'
import { removePerson } from '../../actions/personsActions';
import { Box } from '@material-ui/core';
import { PersonType } from 'src/types/global';
import useStyles from './styles';

type Props = {
  person: PersonType
}

const PersonsItem = ({ person }: Props) => {
  const classes = useStyles()
  const [showEditForm, setShowEditForm] = useState(false)
  const dispatch = useDispatch()

  const openEditForm = () => {
    setShowEditForm(true)
  }

  const closeEditForm = () => {
    setShowEditForm(false)
  }

  const onRemovePerson = async () => {
    if (!person._id) return
    const success = await api.deleteItem(person._id, 'persons')
    if (success) dispatch(removePerson(person._id))
  }

  return (
    <Grid item xs={12} sm={6} md={4} spacing={2}>
      <Paper className={classes.paper} elevation={3}>
        {showEditForm && <NewPerson onClose={closeEditForm} person={person} />}
        <Grid container spacing={1} alignContent='space-between'>
          <Grid item>
            <Avatar name={person.avatar || ''} dir={String(person._id)} />
          </Grid>
          <Grid item xs={12} direction="column" className={classes.paperAction}>
            <Typography gutterBottom variant="h6">
              <span>{`${person.surname} ${person.name}`}</span>
            </Typography>
            <Typography variant="body2" gutterBottom>
              Должность: <span style={{color: 'crimson', fontWeight: 500}}>{person.position}</span>
            </Typography>
            <Typography variant="body2">
              <a className={"persons-list__details-phone"} href={`tel:${person.phone}`}>
                Телефон:  <span style={{color: 'green', fontWeight: 500}}>{person.phone}</span>
              </a>
            </Typography>

            <Grid item>
              <DialogActions style={{margin: '5px 0 -10px'}}>
                <Button onClick={openEditForm} color="primary">
                  <h5>редактировать</h5>
                </Button>
                <Button onClick={onRemovePerson} color="primary">
                  <h5>удалить</h5>
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default PersonsItem
