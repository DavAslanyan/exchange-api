const { HttpStatusCodesUtil } = require('../../util')
const AppError = require('./AppError')

class ConflictError extends AppError {
  constructor (message = 'Duplicate entry', slug = 'duplicate-error') {
    super(HttpStatusCodesUtil.CONFLICT, message, slug)
  }
}

module.exports = ConflictError
