import { addRoute } from '@vramework/core/http'

import {
  type UpdateBook,
  type CreateBook,
  type JustBookId,
} from '../types/books.types.js'
import { Services } from '../types/application-types.js'

addRoute({
  auth: false,
  method: 'get',
  route: '/books',
  func: async (services: Services) => await services.books.getBooks(),
})

addRoute({
  auth: false,
  method: 'post',
  route: '/book',
  func: async (services: Services, data: CreateBook) =>
    await services.books.createBook(data),
})

addRoute({
  auth: false,
  method: 'get',
  route: '/book/:id',
  func: async (services: Services, data: JustBookId) =>
    await services.books.getBook(data.id),
})

addRoute({
  auth: false,
  method: 'patch',
  route: '/book/:id',
  func: async (services: Services, { id, ...update }: UpdateBook) => {
    return await services.books.updateBook(id, update)
  },
})

addRoute({
  auth: false,
  method: 'delete',
  route: '/book/:id',
  func: async (services: Services, data: JustBookId) =>
    await services.books.deleteBook(data.id),
})
