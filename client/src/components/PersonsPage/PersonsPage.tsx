import React, { useEffect } from 'react'
import { isMobileOnly } from 'react-device-detect'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPersons } from "../../actions"
import { PersonType } from '../../types/global'
import { StoreType, PersonsStoreType } from '../../types/store'
import { MiniPreloader } from '../Preloader'
import PersonsItem from './PersonItem'

import './PersonsPage.scss'
import AddNewPerson from './AddNewPerson'

const PersonsPage: React.FC = () => {
  const dispatch = useDispatch()
  const { persons, loading }: PersonsStoreType = useSelector(({ persons }: StoreType) => persons)

  useEffect(() => {
    dispatch(getAllPersons())
  }, [])

  return loading || !persons.length ? <MiniPreloader /> : (
    <section className={isMobileOnly ? 'mobile-page' : 'page'}>
      <div className='persons-list'>
        <h2 className="persons-list__title">Персонал КИПиСА</h2>
        {(persons as PersonType[]).map((item: PersonType, i: number) => (
          <PersonsItem
            key={item._id}
            panel={`panel${i}`}
            {...item}
          />
        ))}
      </div>
      <AddNewPerson>Добавить нового работника</AddNewPerson>
    </section>
  )
}

export default PersonsPage


// <div className="personslist">
// {persons.map((item: PersonType, i: number) => (
//     <PersonsItem
//         key={item._id}
//         updatePersons={updatePersons}
//         deleteItem={serv.deleteItem}
//         panel={`panel${i}`} {...item}
//     />))}
// )
// </div>
