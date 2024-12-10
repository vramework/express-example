import { Book, Books, CreateBook } from '../types/books.types.js'
import { NotFoundError } from '@vramework/core/errors'

/**
 * Service for managing books with basic CRUD operations.
 */
export class BookService {
  private books = new Map<string, Book>()
  private nextId: number = 1

  /**
   * Creates a new book and adds it to the collection.
   */
  public createBook(book: CreateBook): Book {
    const newBook: Book = { id: (this.nextId++).toString(), ...book }
    this.books.set(newBook.id, newBook)
    return newBook
  }

  /**
   * Retrieves a book by its unique ID.
   */
  public getBook(id: string): Book {
    const book = this.books.get(id)
    if (book) {
      return book
    }
    throw new NotFoundError(`Book with ID ${id} not found`)
  }

  /**
   * Retrieves the list of all books in the collection.
   */
  public getBooks(): Books {
    return [...this.books.values()]
  }

  /**
   * Updates the properties of a book with the given ID.
   */
  public updateBook(id: string, updatedInfo: Partial<Omit<Book, 'id'>>): Book {
    const book = this.getBook(id)
    if (book) {
      this.books.set(id, { ...book, ...updatedInfo })
      return book
    }
    throw new NotFoundError(`Book with ID ${id} not found`)
  }

  /**
   * Updates the properties of a book with the given ID.
   */
  public deleteBook(id: string): boolean {
    return this.books.delete(id)
  }
}
