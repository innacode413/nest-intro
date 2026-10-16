/**
 * app.module.task2.solution.ts
 * Завдання 2: додає StatsModule. Скопіюйте в ../../app/src/app.module.ts.
 */
import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [BooksModule, AuthorsModule, StatsModule],
})
export class AppModule {}
