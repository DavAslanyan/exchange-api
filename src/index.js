require('dotenv').config()
const App = require('./app')
const { LoggerUtil } = require('./util')

const { name, engines } = require('../package.json')

async function startServer () {

  await App.init()
  const app = App.app

  app.listen(App.port, () => {
    LoggerUtil.info(`${name} started:`)
    LoggerUtil.info(`\tPort: ${App.port}`)
    LoggerUtil.info(`\tEnvironment: ${process.env.NODE_ENV}`)
    LoggerUtil.info(`\tNode version: ${process.version}. Recommended v${engines.node}`)
    LoggerUtil.info(`\tStart date: ${(new Date()).toUTCString()} \n`)
  })
  return app
}

module.exports = startServer().catch(err => LoggerUtil.error(err.message))
