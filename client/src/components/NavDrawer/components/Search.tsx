import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import { FilterStoreType, StoreType } from '../../../types/store'
import { setSearchQuery } from '../../../actions/tasksActions'

const Search: React.FC = () => {
  const dispatch = useDispatch()
  const { searchQuery }: FilterStoreType = useSelector(({ filter }: StoreType) => filter)
  const [isActive, setIsActive] = useState(false)

  const openSearchInput = (event: React.MouseEvent<{}>): void => {
    setIsActive(true)
  }

  const closeSearchInput = (event: React.MouseEvent<{}>): void => {
    !searchQuery.length && setIsActive(false)
  }

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchQuery(event.target.value))
  }

  const removeQueryInput = (): void => {
    dispatch(setSearchQuery(''))
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
