const vendorModel = require('../models/vendorModel')

exports.fetchVendors = async (req, res) => {
  let snapshot = await vendorModel.get()
  let result = []

  snapshot.forEach(doc => {
    result.push({ ...doc.data(), id: doc.id })
    console.log(doc.data())
  })
  console.log(result)
  result = result.length > 0 ? result : null
  return res.send({ message: result })
}

exports.kycApproval = async (req, res) => {
  let { id, reason, status } = req.body
  let result = await vendorModel.doc(id).update(req.body)
  return res.send({ message: 'Successful!' })
}
