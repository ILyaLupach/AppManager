const { rejects } = require('assert')
const config = require('config')
const fs = require('fs')
const path = require('path')

class FileService {

  getPath = (file) => path.join(__dirname, `../files/${file.path}`)

  createDir = (file) => {
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

  removeFile = (file) => {
    const filePath = this.getPath(file)
    file.type === 'dir'
      ? fs.rmdirSync(filePath)
      : fs.unlinkSync(filePath)
  }
}

const newService = new FileService()
module.exports = newService
