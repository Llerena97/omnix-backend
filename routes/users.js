const express = require('express')
const router = express.Router()
const userController = require('./../controllers/usersController')
const {check} = require('express-validator')

router.post('/',
  [
    check('user', 'user is required ').not().isEmpty()
  ],
  userController.newUser
)

module.exports = router 