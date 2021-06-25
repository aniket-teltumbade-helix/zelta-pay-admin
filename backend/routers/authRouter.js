const multer = require('multer')
const {
  signin,
  register,
  userInfo,
  signout,
  updateProfile,
  updateProfilePic
} = require('../controllers/authController')
const authVerify = require('../middlewares/authVerify')

var authRouter = require('express').Router()
const upload = multer({
  storage: multer.memoryStorage()
})
authRouter.post('/login', signin)
authRouter.post('/register', register)
authRouter.get('/user', authVerify, userInfo)
authRouter.get('/logout', signout)
authRouter.post('/update', authVerify, updateProfile)
authRouter.post(
  '/update/image',
  [authVerify, upload.single('file')],
  updateProfilePic
)

module.exports = authRouter
