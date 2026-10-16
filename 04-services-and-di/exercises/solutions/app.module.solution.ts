/**
 * app.module.solution.ts
 * Не забутий providers - саме ця зміна і є суттю завдання 2 і 3.
 * Скопіюйте в ../../app/src/app.module.ts.
 */
import { Module } from '@nestjs/common';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { BooksRepository } from './books/books.repository';
import { BooksStatsService } from './books/books-stats.service';

@Module({
  controllers: [BooksController],
  // [НОВЕ] BooksRepository і BooksStatsService мають бути тут,
  // інакше Nest не зможе їх підставити в BooksService.
  providers: [BooksService, BooksRepository, BooksStatsService],
})
export class AppModule {}
