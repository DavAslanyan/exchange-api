const { HttpStatusCodesUtil } = require('../../util')

const AppError = require('./AppError')

class ValidationError extends AppError {
  constructor (message = 'Reference not existing entity', slug = 'validation-error') {
    super(HttpStatusCodesUtil.BAD_REQUEST, message, slug)
  }
}

module.exports = ValidationError
