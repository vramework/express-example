import { Server } from 'http'
import * as express from 'express'
import * as core from 'express-serve-static-core'
import { json } from 'body-parser'
import * as cookieParser from 'cookie-parser'

import { ConsoleLogger } from '@vramework/core'
import { vrameworkMiddleware } from '@vramework/express-middleware'
import { config } from '../src/config'
import { createSessionServices, createSingletonServices } from '../src/services'

import '../.vramework/vramework-bootstrap'

export class ExpressServer {
  public app: core.Express = express()
  public logger: ConsoleLogger = new ConsoleLogger()
  public server: Server | undefined

  public async start() {
    this.app.use(json())
    this.app.use(cookieParser())

    this.app.get('/health-check', (_req, res) => {
        res.status(200).json({ status: 'ok' })
    })

    // Create the singleton services
    const singletonServices = await createSingletonServices(config, this.logger)
    // Attach the vramework middleware
    this.app.use(vrameworkMiddleware(singletonServices, createSessionServices, {
      respondWith404: false,
    }))

    this.server = this.app.listen(config.port, config.hostname, () => {
      this.logger.info(`listening on port ${config.port} and host: ${config.hostname}`)
    })
  }
}
