const mongoose = require('mongoose')

const ExchangeSchema  = require('./schema')

class ExchangeModel {
    static getExchanges () {
        return ExchangeModel.model.find({})
    }
    static updateExchange (currency, payload) {
        console.log(currency, payload)
        const query = { currency }
        const update = { $set: payload }
        const options = { upsert: true, new: true, setDefaultsOnInsert: true }
        return ExchangeModel.model.findOneAndUpdate(query, update, options)
    }
}

ExchangeModel.model = mongoose.model('Exchanges', ExchangeSchema)

module.exports = ExchangeModel

