/**
 * app.module.ts
 * Кореневий модуль. Поки реєструє лише BooksController - без провайдерів,
 * бо сервіси ще не вивчали (тема 04). Пов'язаний файл:
 * books/books.controller.ts.
 */
import { Module } from '@nestjs/common';
import { BooksController } from './books/books.controller';

@Module({
  controllers: [BooksController],
  providers: [],
})
export class AppModule {}
