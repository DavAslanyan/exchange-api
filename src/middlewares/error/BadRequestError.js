const { HttpStatusCodesUtil } = require('../../util')
const AppError = require('./AppError')

class BadRequestError extends AppError {
  constructor (message = 'Bad request', slug = 'bad-request') {
    super(HttpStatusCodesUtil.BAD_REQUEST, message, slug)
  }
}

module.exports = BadRequestError
