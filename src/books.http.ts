import { addRoute } from '@vramework/core'
import { getBooks, createBook, getBook, updateBook, deleteBook } from './books.function.js'

addRoute({
  auth: false,
  method: 'get',
  route: '/books',
  func: getBooks,
})

addRoute({
  auth: false,
  method: 'post',
  route: '/book',
  func: createBook
})

addRoute({
  auth: false,
  method: 'get',
  route: '/book/:id',
  func: getBook
})

addRoute({
  auth: false,
  method: 'patch',
  route: '/book/:id',
  func: updateBook
})

addRoute({
  auth: false,
  method: 'delete',
  route: '/book/:id',
  func: deleteBook
})
