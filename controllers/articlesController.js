const Article = require('./../models/Article')

exports.allArticles = async (req, res, next) => {
  let articles = await Article.find()
  res.json({articles})
}

exports.getArticle = async (req, res, next) => {
  try {
    const { id } = req.params
    let art = await Article.findById(id)
    res.json({article: art})
  } catch (error) {
    console.log(':: ERROR ::', error)
  }
}

exports.createArticle = async (req, res, next) => {
  const { article } = req.body
  let art = new Article(article);
  let result = await art.save();
  res.json({article: result})
}

exports.updateArticle = async (req, res, next) => {
  const { id } = req.params
  const { article } = req.body
  let art = await Article.findById(id)
  await art.updateOne(article)
  res.json({article: art})
}