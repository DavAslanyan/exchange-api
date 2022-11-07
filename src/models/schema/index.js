const mongoose = require('mongoose')
const mongooseHidden = require('mongoose-hidden')({
    defaultHidden: { index: true, __v: true, createdAt: true, updatedAt: true, _id: true }
})
const mongooseToJson = require('@meanie/mongoose-to-json')
const { CURRENCY_TYPES } = require('../../util').Constants

const ExchangeSchema = new mongoose.Schema({
    currency: { type: String, enum: Object.values(CURRENCY_TYPES), unique: true, required: true, },
    rate: { type: Number, required: true, default: 1 },
    difference: { type: Number, default: 0 },
}, { timestamps: true })

ExchangeSchema.plugin(mongooseHidden)
ExchangeSchema.plugin(mongooseToJson)

module.exports = ExchangeSchema
