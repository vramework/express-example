import { CreateConfig, LogLevel } from '@vramework/core'
import { Config } from '../types/application-types'

export const getConfig: CreateConfig<Config> = async () => ({
  port: 4002,
  hostname: '127.0.0.1',
  logLevel: LogLevel.debug,
})
