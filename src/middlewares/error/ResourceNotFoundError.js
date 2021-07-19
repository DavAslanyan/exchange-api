const { HttpStatusCodesUtil } = require('../../util')

const AppError = require('./AppError')

class ResourceNotFoundError extends AppError {
  constructor (message = 'The specified resource not found', slug = 'not-found') {
    super(HttpStatusCodesUtil.NOT_FOUND, message, slug)
  }
}

module.exports = ResourceNotFoundError
