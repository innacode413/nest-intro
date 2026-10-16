/**
 * app.module.ts
 * Кореневий модуль. На відміну від теми 03, тепер реєструємо ще й
 * providers: [BooksService] - щоб Nest знав, що цей клас можна
 * створювати і підставляти через Dependency Injection. Пов'язані
 * файли: books/books.controller.ts, books/books.service.ts.
 */
import { Module } from '@nestjs/common';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
})
export class AppModule {}
