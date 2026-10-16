/**
 * books-stats.service.solution.ts
 *
 * Завдання 2. Скопіюйте в ../../app/src/books/books-stats.service.ts.
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksStatsService {
  average(years: number[]): number {
    if (years.length === 0) {
      return 0;
    }
    const sum = years.reduce((acc, year) => acc + year, 0);
    return Math.round(sum / years.length);
  }
}
