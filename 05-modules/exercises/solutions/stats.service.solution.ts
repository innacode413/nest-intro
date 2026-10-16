/**
 * stats.service.solution.ts
 * Завдання 2. Скопіюйте в ../../app/src/stats/stats.service.ts
 * (створіть папку stats/, якщо її ще немає).
 */
import { Injectable } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { BooksService } from '../books/books.service';

@Injectable()
export class StatsService {
  // Залежить від сервісів з ДВОХ різних модулів одразу - можливо лише
  // тому, що StatsModule імпортує і BooksModule, і AuthorsModule,
  // а обидва вони експортують свої сервіси.
  constructor(
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorsService,
  ) {}

  getSummary(): { totalBooks: number; totalAuthors: number } {
    return {
      totalBooks: this.booksService.findAll().length,
      totalAuthors: this.authorsService.findAll().length,
    };
  }
}
