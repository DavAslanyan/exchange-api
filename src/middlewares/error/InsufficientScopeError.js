const ForbiddenError = require('./ForbiddenError')

class InsufficientScopeError extends ForbiddenError {
  constructor (message = 'Insufficient scope', slug = 'insufficient-error') {
    super(message, slug)
  }
}

module.exports = InsufficientScopeError
