const { HttpStatusCodesUtil } = require('../../util')
const AppError = require('./AppError')

class MicroserviceError extends AppError {
  constructor (status = HttpStatusCodesUtil.FAILED_DEPENDENCY, message = 'Failed dependency', slug = 'failed-dependency') {
    super(status, message, slug)
  }
}

module.exports = MicroserviceError
