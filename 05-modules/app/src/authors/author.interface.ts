/**
 * author.interface.ts
 * Форма одного автора. Пов'язані файли: authors.service.ts,
 * ../books/books.service.ts (використовує Author, щоб показати ім'я автора книжки).
 */
export interface Author {
  id: number;
  name: string;
  country: string;
}
