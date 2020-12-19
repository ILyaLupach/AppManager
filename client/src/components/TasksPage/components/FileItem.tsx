import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { TaskFile } from 'src/types/global';
import api from 'src/api';
import pdfIcon from './images/pdf-icon.svg'
import docIcon from './images/doc-icon.svg'
import { Box, createStyles, Theme } from '@material-ui/core';
import formatSize from 'src/utils/formatSize';

type ItemProps = {
  file: TaskFile
  dir: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      cursor: 'pointer',
      position: 'relative',
      '&:hover': {
        backgroundColor: '#d4f7ff',
      },
    },
    wrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 100,
      border: '1px solid rgba(0, 0, 0, 0.2)',
      minHeight: 60,
    },
    image: {
      height: 'auto',
      width: '100%',
    },
    textWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxWidth: 300,
      paddingLeft: 20,
      paddingRight: 10,
      '& > * > span': {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }
    },
    fileBlock: {
      display: 'flex',
      alignItems: 'center',
    }
  })
)

const FileItem = ({ file, dir }: ItemProps) => {
  const classes = useStyles()
  const [fileUrl, setFileUrl] = useState('')
  useEffect(() => {
    getFile()
  }, [])

  const getFile = async () => {
    try {
      const { url }: any = await api.downloadFile(dir, file.name)
      url && setFileUrl(url)
    } catch (error) { }
  }

  const getImage = (str: string) => {
    if (str.includes('.doc')) {
      return docIcon
    }
    if (str.includes('.pdf')) {
      return pdfIcon
    }
    return fileUrl
  }

  return !fileUrl ? null : (
    <ListItem key={file.name} className={classes.container}>
      <a href={fileUrl} target='_blank' className={classes.fileBlock}>
        <ListItemAvatar>
          <Box className={classes.wrapper}>
            <img src={getImage(file.name)} className={classes.image} />
          </Box>
        </ListItemAvatar>
        <Box className={classes.textWrapper}>
          <ListItemText primary={file.name} />
          <ListItemText primary={formatSize(file.size)} />
        </Box>
      </a>
    </ListItem>
  )
}

export default FileItem
