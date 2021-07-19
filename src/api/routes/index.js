const app = require('express')()
const swaggerUi = require('swagger-ui-express')

const SwaggerConfig = require('../../config/swagger.config')

const exchange = require('./exchange.api')

/**
 * @description Initialize swagger.
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerConfig.getSwaggerDocument()))

/**
 * @description Add required APIs.
 */

app.use('/rates-list', exchange)
module.exports = app
