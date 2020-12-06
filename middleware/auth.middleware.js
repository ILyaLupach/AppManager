const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req, res, next) => {
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

module.exports = auth
