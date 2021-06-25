var authModel = require('../models/authModel')

const authVerify = (req, res, next) => {
  let token = req.headers.authorization
  if (!token) {
    return res.send({ error: 'No token provided!' })
  }
  let idToken = token.split(' ')[1]
  authModel.admin
    .verifyIdToken(idToken)
    .then(decodedToken => {
      const uid = decodedToken.uid
      req.user = decodedToken
      next()
    })
    .catch(error => {
      return res.send({ error })
    })
}
module.exports = authVerify
