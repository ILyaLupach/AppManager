import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import { StoreType } from '../../../types/store'
import { getAllTasks, setSearchQuery } from '../../../actions/tasksActions'
import _ from 'lodash'
import { useDebounce } from 'src/components/shared/Hooks'

const Search = () => {
  const dispatch = useDispatch()
  const { filterBy, searchQuery, limit } = useSelector(({ filter }: StoreType) => filter)
  const [isActive, setIsActive] = useState(false)

  const debouncedSearch = useDebounce(searchQuery, 1000)

  useEffect(() => {
    dispatch(getAllTasks(limit, filterBy, debouncedSearch))
  }, [debouncedSearch])

  const openSearchInput = () => {
    setIsActive(true)
  }

  const closeSearchInput = () => {
    !searchQuery.length && setIsActive(false)
  }

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchQuery(event.target.value))
  }

  return (
    <ListItem
      className='nav-drawer__filter'
      onMouseLeave={closeSearchInput}
    >
      <ListItemIcon>
        <SearchIcon color={searchQuery.length ? 'error' : 'inherit'} />
      </ListItemIcon>
      {isActive
        ? (
          <TextField
            value={searchQuery}
            onChange={handleChangeQuery}
            id="name"
            placeholder='Поиск'
            onMouseLeave={closeSearchInput}
          />
        ) : (
          <ListItemText
            primary={'Поиск'}
            onMouseEnter={openSearchInput}
          />
        )}
    </ListItem>
  )
}

export default Search
