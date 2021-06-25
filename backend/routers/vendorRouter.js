const { fetchVendors, kycApproval } = require('../controllers/vendorController')
const authVerify = require('../middlewares/authVerify')

var vendorRouter = require('express').Router()

vendorRouter.get('/all', authVerify, fetchVendors)
vendorRouter.post('/kyc/approval', authVerify, kycApproval)

module.exports = vendorRouter
