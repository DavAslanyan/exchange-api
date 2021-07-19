const { SuccessHandlerUtil } = require('../../util')

const ExchangeService = require('../../services')

class ExchangeController {
  static async getExchanges (request, response, next) {
    const exchanges = await ExchangeService.getExchanges()
    return SuccessHandlerUtil.handleList(response, next, exchanges)
  }
}

module.exports = ExchangeController
