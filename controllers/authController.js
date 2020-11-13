require('dotenv').config({path: '.env'})
const User = require('./../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.authenticateUser = async (req, res, next) => {
  const {email, password} = req.body.user
  const user = await User.findOne({email})
  if (!user) {
    res.status(401).json({msg: "user doesn't exist"})
    return next()
  }
  if (bcrypt.compareSync(password, user.password )) {
    const token = jwt.sign({id: user._id, name: user.name}, process.env.SECRET_SIGN, {expiresIn: '24h'})
    res.json({token})
  } else {
    res.status(401).json({msg: "invalid password"})
    return next()
  }
}

exports.currentUser = async (req, res, next) => {
  let user = await User.findById(req.user.id)
  res.json({user: {_id: user._id, name: user.name, email: user.email}})
}