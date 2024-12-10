import { CreateConfig } from '@vramework/core'
import { LogLevel } from '@vramework/core/services'
import { Config } from '../types/application-types.js'

export const getConfig: CreateConfig<Config> = async () => ({
  port: 4002,
  hostname: '127.0.0.1',
  logLevel: LogLevel.debug,
})
