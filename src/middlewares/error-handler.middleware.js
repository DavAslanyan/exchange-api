const { AppError, InternalServerError, ConflictError, ValidationError, BadRequestError } = require('./error')

class ErrorHandlerMiddleware {
  static init (error, request, response, next) {
    if (error instanceof AppError) {
      return response.status(error.status).json(error.getErrorData())
    }
    const { name, status, code, message } = error
    /* mongodb errors region */
    if (code === 11000) { // duplicate
      const duplicateError = new ConflictError()
      return response.status(duplicateError.status).json(duplicateError.getErrorData())
    }
    if (name === 'ValidationError') {
      const validationError = new ValidationError(message)
      return response.status(validationError.status).json(validationError.getErrorData())
    }
    /* end region */
    /* body parser errors region */
    if (name === 'SyntaxError') {
      const validationError = new BadRequestError(message)
      return response.status(validationError.status).json(validationError.getErrorData())
    }
    /* end region */
    // temp. log to explore and add more cases.
    console.log('Case: ', status, code, name, message)
    const internalServerError = new InternalServerError()
    response.status(internalServerError.status).json(internalServerError.getErrorData())
  }
}

module.exports = ErrorHandlerMiddleware
