const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const authRouter = require('./routers/authRouter')
const vendorRouter = require('./routers/vendorRouter')

const app = express()

app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use('/auth', authRouter)
app.use('/vendor', vendorRouter)

app.listen(9898, () => {
  console.log('running')
})
