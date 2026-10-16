/**
 * books.service.ts
 *
 * [НОВЕ] Увесь код, що був раніше прямо в BooksController (тема 03),
 * переїхав сюди. Сервіс нічого не знає про HTTP (жодного req/res,
 * жодних статус-кодів) - тільки дані й бізнес-логіка. Пов'язаний
 * файл: books.controller.ts (інжектує цей сервіс).
 */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Book } from './book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

// @Injectable() позначає клас як провайдер - такий клас Nest може
// створити сам і підставити в конструктор будь-кого, хто його попросить
// (наприклад, BooksController нижче). Без @Injectable() Nest відмовиться
// це робити.
@Injectable()
export class BooksService {
  private books: Book[] = [
    { id: 1, title: 'Кобзар', author: 'Тарас Шевченко', year: 1840 },
    { id: 2, title: 'Тигролови', author: 'Іван Багряний', year: 1944 },
    { id: 3, title: 'Місто', author: 'Валер\'ян Підмогильний', year: 1928 },
  ];
  private nextId = 4;

  parseId(id: string): number {
    const parsed = Number(id);
    if (Number.isNaN(parsed)) {
      throw new BadRequestException('id має бути числом');
    }
    return parsed;
  }

  findAll(author?: string): Book[] {
    if (!author) {
      return this.books;
    }
    return this.books.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase()),
    );
  }

  findOneOrThrow(id: number): Book {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new NotFoundException(`Книжку з id=${id} не знайдено`);
    }
    return book;
  }

  create(dto: CreateBookDto): Book {
    const book: Book = {
      id: this.nextId,
      title: dto.title,
      author: dto.author,
      year: dto.year,
    };
    this.nextId += 1;
    this.books.push(book);
    return book;
  }

  update(id: number, dto: UpdateBookDto): Book {
    this.findOneOrThrow(id);
    const updated: Book = { id, title: dto.title, author: dto.author, year: dto.year };
    this.books = this.books.map((b) => (b.id === id ? updated : b));
    return updated;
  }

  remove(id: number): void {
    this.findOneOrThrow(id);
    this.books = this.books.filter((b) => b.id !== id);
  }
}
