import React, { useEffect, useState } from 'react';
import api from 'src/api';
import { Avatar, ButtonBase } from '@material-ui/core';
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
    } catch (error) {
      setFileUrl('')
     }
  }

  return (
    <ButtonBase className={classes.image}>
      {fileUrl && name ? (
        <a href={fileUrl} target='_blank' rel='noreferrer'>
          <Avatar src={fileUrl} className={classes.large} />
        </a>
      ) : (
        <Avatar src="/broken-image.jpg" className={classes.large} />
      )}
    </ButtonBase >
  )

}

export default AvatarPerson
