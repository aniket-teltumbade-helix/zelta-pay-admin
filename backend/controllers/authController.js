const db = require('../db')
const authModel = require('../models/authModel')
const MIME_TYPES = {
  'image/jpg': '.jpg',
  'image/jpeg': '.jpg',
  'image/png': '.png'
}
exports.signin = async (req, res) => {
  try {
    let result = await authModel.firebase.signInWithEmailAndPassword(
      req.body.email,
      req.body.password
    )
    let token = await result.user.getIdToken()
    if (result) res.send({ token, refreshToken: result.user.refreshToken })
  } catch (error) {
    res.send({ error })
  }
}

exports.register = async (req, res) => {
  try {
    let result = await authModel.firebase.createUserWithEmailAndPassword(
      req.body.email,
      req.body.password
    )
    let token = await result.user.getIdToken()
    if (token) res.send({ message: 'Registartion successful!' })
  } catch (error) {
    res.send({ error })
  }
}
exports.userInfo = async (req, res) => {
  if (await req.user) {
    let userinfo = await authModel.admin.getUser(req.user.uid)
    res.send({ user: userinfo })
  } else {
    res.send({ error: "You aren't authorized" })
  }
}
exports.signout = (req, res) => {
  res.send({ token: null })
}
exports.updateProfile = async (req, res) => {
  try {
    await authModel.admin.updateUser(req.user.uid, req.body)
    res.send({ message: 'Updation successful!' })
  } catch (error) {
    res.send({ error })
  }
}
exports.updateProfilePic = async (req, res) => {
  let bucket = db.sBucket.bucket('zpay-a2806.appspot.com')
  let file = req.file
  let fileUpload = bucket.file(
    file.originalname + Date.now() + MIME_TYPES[file.mimetype]
  )
  const blobStream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype
    }
  })
  blobStream.on('error', error => {
    console.error(error)
  })
  blobStream.on('finish', async () => {})
  blobStream.end(file.buffer)
  await authModel.admin.updateUser(req.user.uid, {
    photoURL: `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURI(fileUpload.name)}?alt=media`
  })
  res.send({ message: 'Updation successful!' })
}
