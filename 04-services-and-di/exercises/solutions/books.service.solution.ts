/**
 * books.service.solution.ts
 *
 * Фінальний стан BooksService після всіх трьох завдань: залежить від
 * BooksRepository (завдання 3) і BooksStatsService (завдання 2), сам
 * більше не тримає масив books. Скопіюйте в
 * ../../app/src/books/books.service.ts.
 */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Book } from './book.interface';
import { BooksRepository } from './books.repository';
import { BooksStatsService } from './books-stats.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  // [НОВЕ] Два параметри замість нуля - Nest створить обидва провайдери
  // сам і підставить сюди, у тому порядку, в якому вони перелічені тут.
  constructor(
    private readonly repository: BooksRepository,
    private readonly statsService: BooksStatsService,
  ) {}

  parseId(id: string): number {
    const parsed = Number(id);
    if (Number.isNaN(parsed)) {
      throw new BadRequestException('id має бути числом');
    }
    return parsed;
  }

  findAll(author?: string): Book[] {
    const books = this.repository.findAll();
    if (!author) {
      return books;
    }
    return books.filter((b) => b.author.toLowerCase().includes(author.toLowerCase()));
  }

  findOneOrThrow(id: number): Book {
    const book = this.repository.findById(id);
    if (!book) {
      throw new NotFoundException(`Книжку з id=${id} не знайдено`);
    }
    return book;
  }

  create(dto: CreateBookDto): Book {
    return this.repository.insert({ title: dto.title, author: dto.author, year: dto.year });
  }

  update(id: number, dto: UpdateBookDto): Book {
    this.findOneOrThrow(id);
    return this.repository.replace(id, { title: dto.title, author: dto.author, year: dto.year });
  }

  remove(id: number): void {
    this.findOneOrThrow(id);
    this.repository.deleteById(id);
  }

  // [НОВЕ] Завдання 1 + 2: статистика, рахунок середнього року
  // делегований окремому BooksStatsService.
  getStats(): { total: number; oldestYear: number; newestYear: number; averageYear: number } {
    const books = this.repository.findAll();
    const years = books.map((b) => b.year);

    return {
      total: books.length,
      oldestYear: Math.min(...years),
      newestYear: Math.max(...years),
      averageYear: this.statsService.average(years),
    };
  }
}
