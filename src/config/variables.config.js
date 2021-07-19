const VariablesConfig = {
  CORS: {
    ORIGIN: process.env.CORS_ORIGIN || '*'
  },
  DISABLE_REQUEST_LOG: process.env.DISABLE_REQUEST_LOG || 0,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  MONGODB: {
    URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/exchange'
  },
  SWAGGER_HOST: process.env.SWAGGER_HOST || 'http://localhost:3000',
  PORT: process.env.PORT || '3000',
}

module.exports = VariablesConfig
