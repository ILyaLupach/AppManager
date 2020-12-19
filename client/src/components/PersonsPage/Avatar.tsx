import React, { useEffect, useState } from 'react';
import api from 'src/api';
import { Avatar, Box, ButtonBase } from '@material-ui/core';
import useStyles from './styles';

type ItemProps = {
  name: string | ''
  dir: string
}

const AvatarPerson = ({ name, dir }: ItemProps) => {
  const classes = useStyles()
  const [fileUrl, setFileUrl] = useState('')
  useEffect(() => {
    getFile()
  }, [name])

  const getFile = async () => {
    if(!name) return
    try {
      const { url }: any = await api.downloadFile(dir, name)
      url && setFileUrl(url)
    } catch (error) { }
  }

  return (
    <ButtonBase className={classes.image}>
      <a href={fileUrl} target='_blank'>
        <Avatar src={fileUrl || "/broken-image.jpg"} className={classes.large} />
      </a>
    </ButtonBase >
  )

}

export default AvatarPerson
