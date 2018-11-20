const router = require('express').Router();
const tagCtrl = require('../controllers/tagController')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

// get articles
router.get('/', tagCtrl.getAll)

module.exports = router