import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from 'config'

const auth = (req: any, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') return next()
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'Auth error' })
    const decodedKey = jwt.verify(token, config.get('secretKey'))
    req.user = decodedKey
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Auth error' })
  }
}

export default auth
