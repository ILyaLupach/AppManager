import React from 'react'
import { Backdrop } from '@material-ui/core'
import RotateIcon from '../images/phone-rotation.svg'
import useStyles from '../styles'

const LandscapeWarning = () => {
  const classes = useStyles()
  return (
    <Backdrop open className={classes.rotateWarning} >
      <img
        src={RotateIcon}
        alt='file-image'
      />
    </Backdrop>
  )
}

export default LandscapeWarning
