import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SortIcon from '@material-ui/icons/Sort'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { WorkshopsType } from '../../../types/global'
import { FilterStoreType, StoreType } from '../../../types/store'
import { setFilter } from '../../../actions/tasksActions'

type PropsType = {
  isOpen: boolean
}

const Filter = ({ isOpen }: PropsType) => {
  const dispatch = useDispatch()
  const workshops: WorkshopsType[] =
    useSelector(({ workshops }: StoreType) => workshops.workshops)
  const { filterBy }: FilterStoreType = useSelector(({ filter }: StoreType) => filter)
  const [expanded, setExpanded] = useState<boolean>(false)

  const changeFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setFilter(event.target.value))
  }

  const handleAccordion = (event: React.ChangeEvent<{}>): void => {
    setExpanded(!expanded)
  }

  return (
    <Accordion expanded={expanded && isOpen} onChange={handleAccordion}>
      <AccordionSummary
        className='nav-drawer__filter'
        expandIcon={<ExpandMoreIcon />}
      >
        <ListItemIcon>
          <SortIcon color={filterBy !== 'Все' ? 'error' : 'inherit'} />
        </ListItemIcon>
        <ListItemText primary={'Фильтр'} />
      </AccordionSummary>
      <AccordionDetails>
        <FormControl component="fieldset">
          <RadioGroup
            value={filterBy}
            onChange={changeFilter}
          >
            <FormControlLabel
              className='nav-drawer__radio-buttom'
              value="Все"
              control={<Radio />}
              label="Все"
            />
            {workshops?.map((item, i) => (
              <FormControlLabel
                className='nav-drawer__radio-buttom'
                key={item._id || i}
                value={item.name}
                control={<Radio />}
                label={item.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  )
}

export default Filter
