import React, { useState } from 'react'
import { isMobileOnly } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { PersonType } from '../../types/global'
import { StoreType } from '../../types/store'
import { MiniPreloader } from '../Preloader'
import PersonsItem from './PersonItem'

import './PersonsPage.scss'
import NewPerson from './NewPerson'

const PersonsPage = () => {
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
      <div className='persons-list'>
        <h2 className="persons-list__title">Персонал КИПиСА</h2>
        {(persons as PersonType[]).map((item, i) => (
          <PersonsItem
            key={item._id || i}
            person={item}
          />
        ))}
      </div>
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
