/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useCallback, useEffect, useState } from 'react'
import { HighlightOff } from '@material-ui/icons'
import pdfIcon from './images/pdf-icon.svg'
import docIcon from './images/doc-icon.svg'
import { TaskFile } from 'src/types/global'
import api from 'src/api'

import './InputFile.scss'

type Props = {
  dir: string
  file: TaskFile
  removeFile: (f: TaskFile) => void
}

const PrevFileItem = ({ dir, file, removeFile }: Props) => {
  const [fileUrl, setFileUrl] = useState('')

  const getFile = useCallback(async () => {
    try {
      const { url }: any = await api.downloadFile(dir, file.name)
      url && setFileUrl(url)
    } catch (error) { }
  },
    [dir, file.name],
  )

  useEffect(() => {
    getFile()
  }, [getFile])

  const getImage = (str: string) => {
    if (!str) return
    if (str.includes('.doc')) {
      return docIcon
    }
    if (str.includes('.pdf')) {
      return pdfIcon
    }
    return fileUrl
  }

  return (
    <div id='qwerty' className='input-file__image-wrapper'>
      <img
        className="input-file__image"
        src={getImage(file.name)}
        alt='file-image'
      />
      <div className="input-file__preview-text">{file.name}</div>
      <HighlightOff
        onClick={() => removeFile(file)}
        style={{
          position: 'absolute',
          top: -5,
          right: -5,
          width: 25,
          height: 25,
          color: 'rgba(0, 0, 0, .6)',
          background: '#fff',
          borderRadius: '50%',
          cursor: 'pointer'
        }}
      />
    </div>
  )
}

export default PrevFileItem
