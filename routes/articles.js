const express = require('express')
const router = express.Router()
const articlesController = require('./../controllers/articlesController')
const {check} = require('express-validator')
const auth = require('./../middlewares/auth')

router.get('/',
  auth,
  articlesController.allArticles
)

router.get('/:id',
  auth,
  articlesController.getArticle
)

router.post('/',
  [
    check('article', 'article is required ').not().isEmpty()
  ],
  auth,
  articlesController.createArticle
)

router.put('/:id',
  auth,
  articlesController.updateArticle
)

module.exports = router 