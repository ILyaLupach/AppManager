import React from 'react';
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { TaskFile } from 'src/types/global';
import FileItem from './FileItem';

type Props = {
  files: TaskFile[]
  dir: string | number
}

const FilesDialog = ({ files, dir }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  }

  if (!files?.length) return null
  return (
    <div>
      <div className="input-file__btn" onClick={handleClickOpen}>
        <AttachFileIcon style={{ width: 16, height: 16, marginRight: 5 }} />
        <span>Вложенные файлы</span>
      </div>

        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          <List style={{overflow: 'hidden'}}>
            {files.map((file, i) => (
              <FileItem key={i} file={file} dir={String(dir)} />
            ))}
          </List>
        </Dialog>
    </div>
  );
}

export default FilesDialog
