const { HttpStatusCodesUtil } = require('../../util')
const AppError = require('./AppError')

class ForbiddenError extends AppError {
  constructor (message = 'Forbidden error', slug = 'forbidden-error') {
    super(HttpStatusCodesUtil.FORBIDDEN, message, slug)
  }
}

module.exports = ForbiddenError
