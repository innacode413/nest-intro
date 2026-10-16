/**
 * update-book.dto.ts
 *
 * DTO для PUT /books/:id. Навмисно повторює форму CreateBookDto -
 * у реальному проєкті для цього існує утиліта PartialType (з
 * @nestjs/mapped-types), яка будує DTO оновлення з DTO створення,
 * але це вже за межами вступного уроку. Пов'язаний файл:
 * books.controller.ts.
 */
export class UpdateBookDto {
  title: string;
  author: string;
  year: number;
}
