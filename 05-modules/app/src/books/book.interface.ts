/**
 * book.interface.ts
 * [НОВЕ] Замість рядкового поля author - authorId, що посилається на
 * Author з authors-модуля. Пов'язані файли: books.service.ts.
 */
export interface Book {
  id: number;
  title: string;
  authorId: number;
  year: number;
}
