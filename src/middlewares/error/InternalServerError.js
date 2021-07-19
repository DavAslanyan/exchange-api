const { HttpStatusCodesUtil } = require('../../util')
const AppError = require('./AppError')

class InternalServerError extends AppError {
  constructor (message = 'Internal server error', slug = 'internal-server-error') {
    super(HttpStatusCodesUtil.INTERNAL_SERVER_ERROR, message, slug)
  }
}

module.exports = InternalServerError
