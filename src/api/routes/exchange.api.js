const router = require('express').Router()

const { AsyncMiddlewareWrapper } = require('../../middlewares')

const ExchangeController = require('../controllers/exchange.controller')

router.get('/',
  AsyncMiddlewareWrapper.asyncMiddlewareWrapper(ExchangeController.getExchanges)
)

module.exports = router
