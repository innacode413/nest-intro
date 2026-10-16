/**
 * update-book.dto.ts
 * Форма тіла запиту для PUT /books/:id.
 * Пов'язаний файл: books.controller.ts.
 */
export class UpdateBookDto {
  title: string;
  author: string;
  year: number;
}
