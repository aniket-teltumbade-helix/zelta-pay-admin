const { db } = require('../db')

const database = db.firestore()

const vendorModel = database.collection('vendors')

module.exports = vendorModel
