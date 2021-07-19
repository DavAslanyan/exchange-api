const UnauthorizedError = require('./UnauthorizedError')

class TokenExpiredError extends UnauthorizedError {
  constructor (message = 'Token expired', slug = 'token-expired') {
    super(message, slug)
  }
}

module.exports = TokenExpiredError
