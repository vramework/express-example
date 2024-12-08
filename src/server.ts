import { Server } from 'http'
import * as express from 'express'
import * as cookieParser from 'cookie-parser'

import { ConsoleLogger } from '@vramework/core/services'
import { vrameworkMiddleware } from '@vramework/express-middleware'

import { getConfig } from '../src/config'
import { createSessionServices, createSingletonServices } from '../src/services'

import '../.vramework/vramework-bootstrap'

export class ExpressServer {
  public app: express.Application = express()
  public logger: ConsoleLogger = new ConsoleLogger()
  public server: Server | undefined

  public async start() {
    this.app.use(express.json())
    this.app.use(cookieParser())

    this.app.get('/health-check', (_req, res) => {
        res.status(200).json({ status: 'ok' })
    })

    // Get the config
    const config = await getConfig()
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
