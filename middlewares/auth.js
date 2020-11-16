require('dotenv').config({path: '.env'})
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (authHeader) {
    try {
      const token = authHeader.split(' ')[1]
      const user = jwt.verify(token, process.env.SECRET_SIGN)
      req.user = user
      return next()
    } catch (error) {
      console.log(':: ERROR ::', error)
      return res.status(401).send({ msg: 'token invalido.' });
    }
  }
  res.status(401).json({ msg: 'Acceso Denegado.' });
}