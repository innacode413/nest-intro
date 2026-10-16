/**
 * authors.module.ts
 *
 * AuthorsModule - "коробка" з усім, що стосується авторів. Головне
 * тут - секція exports: вона каже Nest "AuthorsService можна
 * використовувати і за межами цього модуля, якщо хтось його
 * імпортує". Без цього рядка BooksModule НЕ зможе отримати
 * AuthorsService, навіть якщо імпортує AuthorsModule - побачите цю
 * помилку в вправах. Пов'язаний файл: ../books/books.module.ts
 * (імпортує цей модуль саме заради AuthorsService).
 */

import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  // exports: робить AuthorsService видимим для модулів, які
  // імпортують AuthorsModule (тут - BooksModule).
  exports: [AuthorsService],
})
export class AuthorsModule {}
