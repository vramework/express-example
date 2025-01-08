import type {
  Config,
  Services,
  SingletonServices,
  UserSession,
} from '../types/application-types.js'
import { CreateSessionServices, CreateSingletonServices } from '@vramework/core'
import { ConsoleLogger, LocalVariablesService, Logger } from '@vramework/core/services'
import { VrameworkHTTPSessionService } from '@vramework/core/http'
import { JoseJWTService } from '@vramework/jose'
import { BookService } from './book.service.js'

/**
 * This function creates the singleton services used by the application and is created once on start.
 * It's important to use the types here, as the vramework CLI uses them to improve the development experience!
 */
export const createSingletonServices: CreateSingletonServices<
  Config,
  SingletonServices
> = async (config: Config): Promise<SingletonServices> => {
  const variablesService = new LocalVariablesService()
  const logger = new ConsoleLogger()
  
  const jwt = new JoseJWTService<UserSession>(
    async () => [
      {
        id: 'my-key',
        value: 'the-yellow-puppet',
      },
    ],
    logger
  )

  const httpSessionService = new VrameworkHTTPSessionService<UserSession>(jwt, {})

  return {
    config,
    logger,
    variablesService,
    jwt,
    httpSessionService,
    books: new BookService(),
  }
}

/**
 * This function creates the session services on each request.
 * It's important to use the type CreateSessionServices here, as the vramework CLI uses them to improve the development experience!
 */
export const createSessionServices: CreateSessionServices<
  SingletonServices,
  Services,
  UserSession
> = async (_services, _session) => {
  return {}
}
