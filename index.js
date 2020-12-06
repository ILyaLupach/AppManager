const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require("path")
const config = require('config')
const fileUpload = require('express-fileupload')
const corsMiddleware = require('./middleware/cors.middleware')
const tasksRouter = require('./routes/tasks.routes')
const personsRouter = require('./routes/persons.routes')
const workshopsRouter = require('./routes/workshops.routes')
const authRouter = require('./routes/auth.routes')
const settingsRouter = require('./routes/settings.routes')

const app = express()

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(bodyParser.json())
app.use(express.static('static'))
app.use('/api/auth', authRouter)
app.use('/api/tasks', tasksRouter)
app.use('/api/persons', personsRouter)
app.use('/api/workshops', workshopsRouter)
app.use('/api/settings', settingsRouter)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || config.get('DEV_PORT')

async function start () {
  try {
    // await mongoose.connect('mongodb+srv://Admin:admin@cluster0-ir1ax.mongodb.net/KIP',
    await mongoose.connect('mongodb+srv://test123:test123@clustertasks.oh6ss.mongodb.net/TaskDB',
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      })
    app.listen(PORT, () => {
      console.log('SERVER RUN...', PORT);
    })
  } catch (err) {
    console.log(err);
  }
}

start();
