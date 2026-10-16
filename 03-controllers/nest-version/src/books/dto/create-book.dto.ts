/**
 * create-book.dto.ts
 *
 * DTO (Data Transfer Object) - звичайний клас, що описує форму тіла
 * запиту для POST /books. Без валідації (валідацією через Pipes
 * і class-validator займається тема "Pipes", яка в цей урок не входить -
 * див. підсумок у 06-summary). Пов'язаний файл: books.controller.ts.
 */
export class CreateBookDto {
  title: string;
  author: string;
  year: number;
}
