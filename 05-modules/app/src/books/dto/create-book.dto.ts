/**
 * create-book.dto.ts
 * [НОВЕ] authorId замість author - має посилатись на існуючого автора
 * з authors-модуля (перевіряється в BooksService).
 */
export class CreateBookDto {
  title: string;
  authorId: number;
  year: number;
}
