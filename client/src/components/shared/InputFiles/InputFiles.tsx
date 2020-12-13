import React, { useEffect, useState } from 'react'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import HighlightOff from '@material-ui/icons/HighlightOff';
import pdfIcon from './images/pdf-icon.svg'
import docIcon from './images/doc-icon.svg'

import './InputFile.scss'

type Props = {
  onChooseFiles: (file: File[]) => void
}

const FileInput = ({ onChooseFiles }: Props) => {
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    onChooseFiles(files?.length ? files : [])
  }, [files])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = [...files, ...e.currentTarget.files]
    setFiles(filesList)
    onChooseFiles(filesList)
  }

  const removeFile = (f: File) => {
    let newArr = files?.filter(x => x !== f)
    setFiles(newArr)
  }

  const getImage = (f: File) => {
    if (f.type.includes('image/')) {
      return URL.createObjectURL(f)
    }
    if (f.type.includes('/pdf')) {
      return pdfIcon
    }
    return docIcon
  }

  return (
    <div className='input-file'>
      <label className="input-file__btn">
        <input type="file" multiple onChange={onChange} accept="image/*, application/pdf, .doc" />
        <AttachFileIcon style={{ width: 16, height: 16, marginRight: 5 }} />
        <span>Прикрепить файлы</span>
      </label>
      {!!files?.length && (
        <div className="input-file__files-list">
          {files?.map((f, i) =>
            <div key={i} className='input-file__image-wrapper'>
              <img
                className="input-file__image"
                src={getImage(f)}
              />
              <div className="input-file__preview-text">{f.name}</div>
              <HighlightOff
                onClick={() => removeFile(f)}
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
          )}
        </div>
      )}
    </div>
  )
}

export default FileInput
