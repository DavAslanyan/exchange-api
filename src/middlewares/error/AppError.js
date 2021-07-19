class AppError extends Error {
  constructor (status, message, slug) {
    super()
    this.status = status
    this.message = message
    this.slug = slug
    this.name = this.constructor.name
  }

  getErrorData () {
    return { name: this.name, status: this.status, message: this.message, slug: this.slug }
  }
}

module.exports = AppError
