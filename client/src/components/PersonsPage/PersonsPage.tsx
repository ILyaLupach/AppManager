import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPersons } from "../../actions"
import { PersonType } from '../../types/global'
import { StoreType, PersonsStoreType } from '../../types/store'
import { MiniPreloader } from '../Preloader'
import PersonsItem from './PersonItem'

import './PersonsPage.scss'

const PersonsPage: React.FC = () => {
    const dispatch = useDispatch()
    const { persons, loading }: PersonsStoreType = useSelector(({ persons }: StoreType) => persons)

    useEffect(() => {
        dispatch(getAllPersons())
    }, [])

    useEffect(() => {
        console.log(persons)
    }, [persons])

    return loading || !persons.length ? <MiniPreloader /> : (
        <section className='page'>
            <div className='personslist'>
                {(persons as PersonType[]).map((item: PersonType, i: number) => (
                    <PersonsItem
                        key={item._id}
                        panel={`panel${i}`}
                        {...item}
                    />
                ))}
            </div>
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
