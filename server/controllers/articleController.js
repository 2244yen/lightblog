/** server/controllers/article.ctrl.js*/

const Article = require('../models/Article')
const User = require('../models/User')
const fs = require('fs')
const cloudinary = require('cloudinary')

module.exports = {
  create: (req, res, next) => {
    let { body } = req
    console.log(req.files)
    if (req.files.thumbnail) {
      cloudinary.uploader.upload(req.files.thumbnail.path, (result) => {
        body.thumbnail = result.url || ''
        saveArticle(body)
      },{
        resource_type: 'image'
      })
    } else {
      saveArticle(body)
    }
    function saveArticle (obj) {
      new Article(obj).save((err, article) => {
        if (err)
          return res.status(500).send({ "message": "fail" })
        else
          return res.status(200).send({ "message": "success", "data": article })
          // return article.addAuthor(body.author).then(_article => {
          //   res.status(200).send({ "message": "success", "data": _article })
          // })
        next()
      })
    }
  },
  getAll: (req, res, next) => {
    let { params } = req
    Article.find(params.id)
      .populate('author')
      .populate('comments.author')
      .sort([['createdAt', -1]])
      .exec((err, articles) => {
      if (err)
        res.send(err)
      else if (!articles)
        res.send(400)
      else
        res.status(200).send({ "message": "success", "data": articles })
    })
  },
  getDetail: (req, res, next) => {
    Article.findById(req.params.id).then(response => {
      res.status(200).send({ "message": "success", "data": response })
    }).catch(err => {
      res.status(500).send({ "message": "fail", "err": err })
    })
  },
  delete: (req, res, next) => {
    Article.findByIdAndDelete({ _id: req.params.id })
    .then(response => {
      res.status(200).send({ "message": "success" })
      next()
    })
    .catch(err => {
      res.status(500).send({ "message": "fail", "err": err })
    })
  },
  update: (req, res, next) => {
    Article.findOne({ _id: req.params.id }, function (err, _article) {
      if (!err) {
        if (!_article) {
          res.status(404).send({ "message": "fail", "err": "Not Found" })
        }
        Article.updateOne({}, function (err, response) {
          if (err) {
            res.status(500).send({ "message": "fail", "err": err })
          }
          res.status(200).send({ "message": "success", "data": "Update data successfully!" })
        })
      }
    })
  }
}