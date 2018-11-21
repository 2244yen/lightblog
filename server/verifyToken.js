const jwt = require('jsonwebtoken')
const config = require('./config')

// Middleware functions are used as bridges between some pieces of code. When used in the function chain of an endpoint they can be incredibly useful in authorization and error handling.

function verifyToken (req, res, next) {
  var token = req.headers['x-access-token']
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' })
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    // save data for other route
    req.userId = decoded._id
    next()
  })
}

module.exports = verifyToken