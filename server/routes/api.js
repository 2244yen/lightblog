const userRoutes = require('./user')
const articleRoutes = require('./article')
const tagRoutes = require('./tag')
const router = require('express').Router();
const authController = require('../controllers/authController')

router.use('/users', userRoutes)
router.use('/articles', articleRoutes)
router.use('/tags', tagRoutes)
router.use('/auth', authController)

module.exports = router