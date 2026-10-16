/**
 * stats.module.solution.ts
 * Завдання 2. Скопіюйте в ../../app/src/stats/stats.module.ts.
 */
import { Module } from '@nestjs/common';
import { BooksModule } from '../books/books.module';
import { AuthorsModule } from '../authors/authors.module';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  // [НОВЕ] Імпортуємо ОБИДВА модулі, щоб отримати доступ до їхніх
  // сервісів - але це спрацює тільки якщо обидва експортують свої
  // сервіси (AuthorsModule вже так робить; BooksModule - потрібно
  // доповнити, див. books.module.task2.solution.ts).
  imports: [BooksModule, AuthorsModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
