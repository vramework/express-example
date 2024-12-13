import type { UpdateBook, CreateBook, JustBookId, Books, Book } from '../types/books.types.js'
import { APIFunction } from '../.vramework/vramework-types.js'

export const getBooks: APIFunction<void, Books> = async (services) => await services.books.getBooks()
export const createBook: APIFunction<CreateBook, Book> = async (services, data) => await services.books.createBook(data)
export const getBook: APIFunction<JustBookId, Book> = async (services, data) =>  await services.books.getBook(data.id)
export const updateBook: APIFunction<UpdateBook, Book> = async (services, { id, ...rest }) =>  await services.books.updateBook(id, rest)
export const deleteBook: APIFunction<JustBookId, void> = async (services, data) => { await services.books.deleteBook(data.id) }