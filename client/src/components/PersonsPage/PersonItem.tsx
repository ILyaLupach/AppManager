import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { PersonType } from '../../types/global';
import NewPerson from './NewPerson';
import api from '../../api';
import { useDispatch } from 'react-redux';
import { removePerson } from '../../actions/personsActions';

type Props = {
  person: PersonType
}

export default function PersonsItem({ person }: Props) {
  const [showEditForm, setShowEditForm] = useState(false)
  const dispatch = useDispatch()

  const openEditForm = () => {
    setShowEditForm(true)
  }

  const closeEditForm = () => {
    setShowEditForm(false)
  }

  const onRemovePerson = async () => {
    if(!person._id) return
    const success = await api.deleteItem(person._id, 'persons')
    if (success) dispatch(removePerson(person._id))
  }

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography >
            <span className=''> {`${person.surname} ${person.name}`} </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="persons-list__details">
            <span><a className={"persons-list__details-phone"} href={`tel:${person.phone}`}> {`Телефон:  ${person.phone}`} </ a></span>
            <span>{`Должность:  ${person.position}`}</span>
          </div>
        </AccordionDetails>
        <DialogActions>
          <Button onClick={openEditForm} color="primary">
            <h5>редактировать</h5>
          </Button>
          <Button onClick={onRemovePerson} color="primary">
            <h5>удалить</h5>
          </Button>
        </DialogActions>
      </Accordion>
      {showEditForm && <NewPerson onClose={closeEditForm} person={person} />}
    </>
  )
}
