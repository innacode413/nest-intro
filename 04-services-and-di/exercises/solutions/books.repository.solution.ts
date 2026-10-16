/**
 * books.repository.solution.ts
 *
 * Завдання 3. Скопіюйте в ../../app/src/books/books.repository.ts.
 */
import { Injectable } from '@nestjs/common';
import { Book } from './book.interface';

@Injectable()
export class BooksRepository {
  private books: Book[] = [
    { id: 1, title: 'Кобзар', author: 'Тарас Шевченко', year: 1840 },
    { id: 2, title: 'Тигролови', author: 'Іван Багряний', year: 1944 },
    { id: 3, title: 'Місто', author: 'Валер\'ян Підмогильний', year: 1928 },
  ];
  private nextId = 4;

  findAll(): Book[] {
    return this.books;
  }

  findById(id: number): Book | undefined {
    return this.books.find((b) => b.id === id);
  }

  insert(book: Omit<Book, 'id'>): Book {
    const created: Book = { id: this.nextId, ...book };
    this.nextId += 1;
    this.books.push(created);
    return created;
  }

  replace(id: number, book: Omit<Book, 'id'>): Book {
    const updated: Book = { id, ...book };
    this.books = this.books.map((b) => (b.id === id ? updated : b));
    return updated;
  }

  deleteById(id: number): void {
    this.books = this.books.filter((b) => b.id !== id);
  }
}
