import express, { Request, Response } from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import path from "path"
import config from 'config'
import fileUpload from 'express-fileupload'
import corsMiddleware from './middleware/cors.middleware'
import tasksRouter from './routes/tasks.routes'
import personsRouter from './routes/persons.routes'
import workshopsRouter from './routes/workshops.routes'
import authRouter from './routes/auth.routes'
import settingsRouter from './routes/settings.routes'
import fileRouter from './routes/file.routes'

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
app.use('/api/files', fileRouter)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req: Request, res: { sendFile: (arg0: string) => void } & Response) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT: string = process.env.PORT || config.get('DEV_PORT')

async function start() {
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

start()
