class AsyncMiddlewareWrapper {
  static asyncMiddlewareWrapper (middleware) {
    return async (req, res, next) => {
      try {
        return await middleware(req, res, next)
      } catch (error) {
        next(error)
      }
    }
  }
}

module.exports = AsyncMiddlewareWrapper
