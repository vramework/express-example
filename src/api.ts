import {
  CoreConfig,
  CoreSingletonServices,
  CoreUserSession,
  JWTService
} from '@vramework/core'
import { BookService } from './book.service'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export type SingletonServices = CoreSingletonServices & {
  jwt: JWTService<UserSession>
  books: BookService
}

export interface Services extends SingletonServices {}
