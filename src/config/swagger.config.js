const yaml = require('yamljs')
const { SWAGGER_HOST } = require('./variables.config')
const swaggerDocument = yaml.load('./api/swagger/swagger.yaml')

class SwaggerConfig {
  static getSwaggerDocument () {
    swaggerDocument.servers[0].variables.host.default = SWAGGER_HOST
    return swaggerDocument
  }
}

module.exports = SwaggerConfig
