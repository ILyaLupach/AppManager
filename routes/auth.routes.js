const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const authMiddleware = require('../middleware/auth.middleware')
const User = require('../models/user')

const router = Router()

router.post('/signup',
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'password must be more than 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const { email, password, name } = req.body

      const validationError = validationResult(req)
      if (!validationError.isEmpty()) {
        return res.status(400).json({ message: 'Uncorrect request' })
      }

      const isUserExist = await User.findOne({ email })
      if (isUserExist) {
        return res.status(400).json({ errorMessage: `User with email ${email} already exist` })
      }

      const hashPassword = await bcrypt.hash(password, 3)
      const newUser = new User({ email, password: hashPassword, name })
      await newUser.save()

      const token = jwt.sign({ id: newUser.id }, config.get('secretKey'), { expiresIn: '30d' })

      res.json({
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
      res.status(500).json({ message: 'server error' })
    }
  })

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ errorMessage: 'User not found' })
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ errorMessage: 'Invalid password' })
    }

    const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '30d' })

    res.json({
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
    res.status(500).json({ message: 'server error' })
  }
})

router.get(
  '/auth',
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id })
      if (!user) return res.status(401).json({ message: 'Auth error' })
      const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '30d' })
      res.json({
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
      res.status(500).json({ message: 'server error' })
    }
  })

module.exports = router
