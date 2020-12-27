import { TaskFile } from '../types'
import fs from 'fs'
import path from 'path'

class FileService {

  getPath = (file: TaskFile) => path.join(__dirname, `../files/${file.path}`)

  createDir = (file: TaskFile) => {
    const filePath = this.getPath(file)
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
          return resolve({message: 'File was created'})
        } else {
          return reject({message: 'File already exist'})
        }
      } catch (error) {
        return reject({message: 'File error'})
      }
    })
  }

  removeFile = (file: TaskFile) => {
    const filePath = this.getPath(file)
    file.type === 'dir'
      ? fs.rmdirSync(filePath)
      : fs.unlinkSync(filePath)
  }
}

const newService = new FileService()
export default newService
