/**
 * book.interface.ts
 * Форма одної книжки у "базі даних" (масиві в пам'яті).
 * Пов'язаний файл: books.controller.ts.
 */
export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}
