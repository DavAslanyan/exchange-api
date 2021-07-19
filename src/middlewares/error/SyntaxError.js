const BadRequestError = require('./BadRequestError')

// body-parser
class SyntaxError extends BadRequestError {
  constructor (message = 'Invalid json', slug = 'invalid_json') {
    super(message, slug)
  }
}

module.exports = SyntaxError
