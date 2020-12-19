const { Router } = require('express')
const path = require('path')
const fs = require('fs')
const Tasks = require("../models/tasks")

const router = Router()

router.post('/upload', async (req, res) => {
  try {
    const { file } = req.files
    const dirPath = path.join(__dirname, `../files/${req.body.dir}`)
    if (!fs.existsSync(dirPath)) {
      await fs.mkdirSync(dirPath)
    }
    const DBpath = `${dirPath}/${file.name}`
    if (fs.existsSync(DBpath)) {
      return res.status(400).json({ message: 'File already exist' })
    }
    file.mv(DBpath)
    const fileType = file.name.split('.').pop()
    const data = {
      name: file.name,
      type: fileType,
      size: file.size,
      path: `${req.body.dir}/${file.name}`,
    }
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'server error' })
  }
})

router.get('/download', async (req, res) => {
  try {
    const filePath = path.join(__dirname, `../files/${req.query.dir}/${req.query.name}`)
    if (fs.existsSync(filePath)) {
      return res.download(filePath, req.query.name)
    } else {
      return res.status(400).json({ message: 'file not found' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Download error' })
  }
})

router.delete('/remove', async (req, res) => {
  try {
    const filePath = path.join(__dirname, `../files/${req.query.dir}/${req.query.name}`)
    fs.unlinkSync(filePath)
    return res.json({ message: 'File was deleted' })
  } catch (error) {
    return res.status(400).json({ message: 'file is not empty' })
  }
})

module.exports = router
