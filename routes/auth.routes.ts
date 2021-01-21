import { Router, Request, Response, NextFunction  } from 'express'
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import authMiddleware from '../middleware/auth.middleware'
import User from '../models/user'
import { Document } from 'mongoose'
import { UserType } from '../types'

const router = Router()

router.post('/signup',
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'password must be more than 6 characters').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body

      const validationError = validationResult(req)
      if (!validationError.isEmpty()) {
        return res.status(400).json({ message: 'Некорректные данные' })
      }

      const isUserExist = await User.findOne({ email })
      if (isUserExist) {
        return res.status(400).json({ errorMessage: `Пользователь ${email} уже существует` })
      }

      const hashPassword = await bcrypt.hash(password, 3)
      const newUser = new User({ email, password: hashPassword, name })
      await newUser.save()

      const token = jwt.sign({ id: newUser._id }, config.get('secretKey'), { expiresIn: '30d' })

      return res.json({
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
          acces: newUser.acces,
        }
      })
    } catch (error) {
      return res.status(500).json({ message: 'server error' })
    }
  })

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ errorMessage: `Пользователь ${email} не существует`  })
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ errorMessage: 'Неверный пароль' })
    }

    const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '30d' })

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        acces: user.acces,
      }
    })

  } catch (error) {
    return res.status(500).json({ message: 'server error' })
  }
})

router.get(
  '/auth',
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: (<any>req).user.id })
      if (!user) return res.status(401).json({ message: 'Auth error' })
      const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '30d' })
      return res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          acces: user.acces,
        }
      })
    } catch (error) {
      return res.status(500).json({ message: 'server error' })
    }
  })

  router.delete("/:id", async (req, res) => {
    try {
      await User.deleteOne({ _id: req.params.id })
      res.send(true)
    } catch (error) {
      res.status(500).json({ message: 'server error' })
    }
  })



  export default router
