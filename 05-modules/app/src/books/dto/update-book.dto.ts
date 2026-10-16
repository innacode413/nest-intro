/**
 * update-book.dto.ts
 * Форма тіла запиту для PUT /books/:id.
 */
export class UpdateBookDto {
  title: string;
  authorId: number;
  year: number;
}
