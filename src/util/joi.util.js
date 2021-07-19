const Joi = require('joi')

class JoiUtil {
}

JoiUtil.queryStringToArray = Joi.extend(joi => ({
  base: joi.array(),
  type: 'stringToArray',
  coerce: {
    from: 'string',
    method (value, sep) {
      if (typeof value !== 'string') {
        return
      }
      return { value: value.split ? value.split(',') : value }
    }
  }
}))

module.exports = JoiUtil
