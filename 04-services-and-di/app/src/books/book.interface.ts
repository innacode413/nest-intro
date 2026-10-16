/**
 * book.interface.ts
 * Форма однієї книжки. Пов'язані файли: books.service.ts, books.controller.ts.
 */
export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}
