import type {
  CoreServerConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
  JWTService,
  LogLevel,
} from '@vramework/core'
import type { BookService } from '../src/book.service.js'

export interface Config extends CoreServerConfig {
  port: number
  hostname: string
  logLevel: LogLevel
}

export interface UserSession extends CoreUserSession {}

export type SingletonServices = CoreSingletonServices & {
  config: Config,
  jwt: JWTService<UserSession>
  books: BookService
}

export interface Services extends CoreServices<SingletonServices> {}
