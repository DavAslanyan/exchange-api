const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const scheduleJob = require("node-schedule");
const ExchangeService = require('./services')

const MongodbConnection = require('./database/mongodb.connection')

const Api = require('./api/routes')

const { CORS, DISABLE_REQUEST_LOG, MONGODB, PORT } = require('./config/variables.config')

const { ErrorHandlerMiddleware } = require('./middlewares')

class App {
  constructor () {
    this.app = express()
    this.port = PORT
  }

  async init () {
    try {
      this._setRequestLogger()
      this._setCors()
      this._setRequestParser()
      App._initializeStorage()
      this._setupExchangeSchedule()
      this._initializeApi()
      this._setErrorHandler()
    } catch ( error ) {
      throw new Error(error)
    }
  }

  _setRequestLogger () {
    DISABLE_REQUEST_LOG !== '1' && this.app.use(morgan('dev'))
  }

  _setCors () {
    this.app.use(cors({
      origin: CORS.ORIGIN,
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With'],
      credentials: true,
      optionsSuccessStatus: 200,
      maxAge: -1
    }))
  }

  _setRequestParser () {
    this.app.use(bodyParser.json({ limit: '1mb' }))
  }

  _setupExchangeSchedule () {
    scheduleJob.scheduleJob('0 0 14 * * *', ExchangeService.getExchangesFromCBA)
  }

  static _initializeStorage () {
    MongodbConnection.init(MONGODB.URL, App._storageSuccessCallback)
  }

  static _storageSuccessCallback () {
    ExchangeService.getExchangesFromCBA()
  }

  _initializeApi () {
    this.app.use('/api/v1', Api)
  }

  _setErrorHandler () {
    this.app.use(ErrorHandlerMiddleware.init)
  }
}

module.exports = new App()
