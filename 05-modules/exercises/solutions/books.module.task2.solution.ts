/**
 * books.module.task2.solution.ts
 * Завдання 2: додає exports: [BooksService]. Скопіюйте в
 * ../../app/src/books/books.module.ts.
 */
import { Module } from '@nestjs/common';
import { AuthorsModule } from '../authors/authors.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [AuthorsModule],
  controllers: [BooksController],
  providers: [BooksService],
  // [НОВЕ] Без цього рядка StatsModule не зможе отримати BooksService,
  // навіть якщо імпортує BooksModule.
  exports: [BooksService],
})
export class BooksModule {}
