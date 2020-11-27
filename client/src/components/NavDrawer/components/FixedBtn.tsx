import React from 'react'
import clsx from 'clsx'

type Props = {
  isOpen: boolean
  isOpenHandler: () => void
}

const FixedBtn = ({ isOpenHandler, isOpen }: Props) => {
  return (
    <div
      className={clsx('nav-drawer__fixed-btn', isOpen && 'nav-drawer__fixed-btn_open')}
      onClick={isOpenHandler}
    >
      <div className='nav-drawer__burger' />
    </div>
  )
}

export default FixedBtn
