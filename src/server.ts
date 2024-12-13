import { Server } from 'http'
import express from 'express'
import cookieParser from 'cookie-parser'

import { vrameworkMiddleware } from '@vramework/express-middleware'

import { createSessionServices } from '../src/services.js'

import '../.vramework/vramework-bootstrap'
import { SingletonServices } from '../types/application-types.js'

export class ExpressServer {
  public app: express.Application = express()
  public server: Server | undefined

  constructor(private singletonServices: SingletonServices) {
  }

  public async start() {
    this.app.use(express.json())
    this.app.use(cookieParser())

    this.app.get('/health-check', (_req, res) => {
      res.status(200).json({ status: 'ok' })
    })

    // Attach the vramework middleware
    this.app.use(
      vrameworkMiddleware(this.singletonServices, createSessionServices, {
        respondWith404: false,
      })
    )

    const config = this.singletonServices.config
    this.server = this.app.listen(config.port, config.hostname, () => {
      this.singletonServices.logger.info(
        `listening on port ${config.port} and host: ${config.hostname}`
      )
    })
  }
}
