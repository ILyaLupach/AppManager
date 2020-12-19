import React, { useState } from 'react'
import { isMobileOnly } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { PersonType } from '../../types/global'
import { StoreType } from '../../types/store'
import { MiniPreloader } from '../Preloader'
import PersonsItem from './PersonItem'
import NewPerson from './NewPerson'
import { Grid } from '@material-ui/core'
import useStyles from './styles'

const PersonsPage = () => {
  const classes = useStyles()
  const [showAddForm, setOpenAddForm] = useState(false)
  const { acces } = useSelector(({ user }: StoreType) => user)
  const { persons, loading } = useSelector(({ persons }: StoreType) => persons)

  const openAddForm = () => {
    setOpenAddForm(true)
  }

  const closeAddForm = () => {
    setOpenAddForm(false)
  }

  return loading ? <MiniPreloader /> : (
    <section className={isMobileOnly ? 'mobile-page' : 'page'}>
      <h2 className={classes.title}>Персонал КИПиСА</h2>
      <Grid item xs={12} className={classes.container}>
        <Grid container justify="flex-start">
          {(persons as PersonType[]).map((item, i) => (
            <PersonsItem
              key={item._id || i}
              person={item}
            />
          ))}
        </Grid>
      </Grid>
      {acces !== 'read-only' && (
        <button
          className={isMobileOnly ? 'mobile-tasks-page__add-btn' : 'desktop-tasks-page__add-btn'}
          onClick={openAddForm}
        >
          Добавить нового работника
        </button>
      )}
      {showAddForm && <NewPerson onClose={closeAddForm} />}
    </section>
  )
}

export default PersonsPage
