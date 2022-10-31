const mongoose = require('mongoose')

const { LoggerUtil } = require('../util')

class MongodbConnection {
  static init (MONGODB_URL, callback) {
    const options = {
      keepAlive: true,
      poolSize: 10,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }

    mongoose.connect(MONGODB_URL, options).catch(MongodbConnection._onConnectionOpeningError)

    mongoose.connection.on('connected', MongodbConnection._onConnected.bind(null, callback))
    mongoose.connection.on('error', MongodbConnection._onError)
    mongoose.connection.on('disconnected', MongodbConnection._onDisconnected)
  }

  static _onConnectionOpeningError (error) {
    LoggerUtil.error(`Failed to init Mongoose connection: ${error.message}`)
  }

  static _onConnected (callback) {
    LoggerUtil.info('Mongoose connected.')
    if (typeof callback === 'function') {
      callback()
    }
  }

  static _onDisconnected () {
    LoggerUtil.error('Mongoose disconnected.')
  }

  static _onError (error) {
    LoggerUtil.error(`Mongoose connection error: ${error.message}`)
  }
}

module.exports = MongodbConnection
