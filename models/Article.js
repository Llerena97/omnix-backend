const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schemaOptions = require('./timestamps')

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true
  },
  largeDescription: {
    type: String,
    required: true,
    trim: true
  }
}, schemaOptions)

module.exports = mongoose.model('Article', articleSchema)