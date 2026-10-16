/**
 * create-book.dto.ts
 * Форма тіла запиту для POST /books, без валідації.
 * Пов'язаний файл: books.controller.ts.
 */
export class CreateBookDto {
  title: string;
  author: string;
  year: number;
}
