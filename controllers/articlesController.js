const Article = require('./../models/Article')
const imageUpload = require('./../lib/imageUpload')
const { v4: uuidv4 } = require('uuid');

exports.allArticles = async (req, res, next) => {
  const {pageSize,pageNumber} = req.query
  let articles = await Article.find()
    .skip((Number(pageNumber) - 1) * Number(pageSize))
    .limit(Number(pageSize))
    .sort({created_at: -1})
  res.json({articles})
}

exports.lastArticles = async (req, res, next) => {
  let articles = await Article.find().limit(5).sort({created_at: -1})
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
  let { article } = req.body
  article.image = await imageUpload(article.image, {name: `${article.title}-${uuidv4()}`})
  let art = new Article(article);
  let result = await art.save();
  res.json({article: result})
}

exports.updateArticle = async (req, res, next) => {
  let { id } = req.params
  let { article } = req.body
  if (!article.image.includes("http")) {
    let urlImage = await imageUpload(article.image, {name: `${article.title}-${uuidv4()}`})
    article.image = urlImage
  }
  let art = await Article.findById(id)
  await art.updateOne(article)
  res.json({article: art})
}