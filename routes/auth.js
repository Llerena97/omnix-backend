const express = require('express')
const router = express.Router()
const authController = require('./../controllers/authController')
const {check} = require('express-validator')
const auth = require('./../middlewares/auth')

router.post('/',
  authController.authenticateUser
)

router.get('/',
  auth,
  authController.currentUser
)

module.exports = router 