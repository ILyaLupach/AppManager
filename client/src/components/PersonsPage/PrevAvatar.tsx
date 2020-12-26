/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useCallback, useEffect, useState } from 'react'
import { HighlightOff } from '@material-ui/icons'
import api from 'src/api'

type Props = {
  dir: string
  name: string
  removeFile: (avatar: string) => void
}

const PrevFileItem = ({ dir, name, removeFile }: Props) => {
  const [fileUrl, setFileUrl] = useState('')

  const getFile = useCallback(async () => {
    const { url }: any = await api.downloadFile(dir, name)
    setFileUrl(url || '')
  }, [dir, name])

  useEffect(() => {
    getFile()
  }, [getFile])

return !fileUrl ? null : (
  <div id='qwerty' className='input-file__image-wrapper'>
    <img
      className="input-file__image"
      src={fileUrl}
      alt='file-image'
    />
    <div className="input-file__preview-text">{name}</div>
    <HighlightOff
      onClick={() => removeFile(name)}
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
