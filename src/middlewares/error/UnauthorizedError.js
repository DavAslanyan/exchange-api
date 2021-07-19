const { HttpStatusCodesUtil } = require('../../util')

const AppError = require('./AppError')

class UnauthorizedError extends AppError {
  constructor (message = 'Unauthenticated request', slug = 'unauthenticated') {
    super(HttpStatusCodesUtil.UNAUTHORIZED, message, slug)
  }
}

module.exports = UnauthorizedError
