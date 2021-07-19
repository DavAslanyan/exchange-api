const BadRequestError = require('./BadRequestError')

class InputValidationError extends BadRequestError {
  constructor (message = 'Validation error', slug = 'validation-error') {
    super(message, slug)
  }

  pushValidationError (errorDetails) {
    this.errors = errorDetails
  }

  getErrorData () {
    return {
      name: this.name,
      status: this.status,
      message: this.message,
      slug: this.slug,
      errors: this.errors
    }
  }
}

module.exports = InputValidationError
