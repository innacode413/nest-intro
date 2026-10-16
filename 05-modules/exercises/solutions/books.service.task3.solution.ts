/**
 * books.service.task3.solution.ts
 * Завдання 3. Скопіюйте в ../../app/src/books/books.service.ts.
 */
import { forwardRef, Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { Book } from './book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

export interface BookWithAuthor extends Book {
  authorName: string;
}

@Injectable()
export class BooksService {
  // [НОВЕ] @Inject(forwardRef(() => AuthorsService)) замість простого
  // параметра з типом. Потрібно, бо тепер AuthorsService теж залежить
  // від BooksService (циклічна залежність) - без forwardRef в обидвох
  // напрямках Nest не зможе визначити, кого створювати першим.
  constructor(
    @Inject(forwardRef(() => AuthorsService))
    private readonly authorsService: AuthorsService,
  ) {}

  private books: Book[] = [
    { id: 1, title: 'Кобзар', authorId: 1, year: 1840 },
    { id: 2, title: 'Тигролови', authorId: 2, year: 1944 },
  ];
  private nextId = 3;

  private withAuthor(book: Book): BookWithAuthor {
    const author = this.authorsService.findByIdOrThrow(book.authorId);
    return { ...book, authorName: author.name };
  }

  parseId(id: string): number {
    const parsed = Number(id);
    if (Number.isNaN(parsed)) {
      throw new BadRequestException('id має бути числом');
    }
    return parsed;
  }

  findAll(): BookWithAuthor[] {
    return this.books.map((b) => this.withAuthor(b));
  }

  findOneOrThrow(id: number): BookWithAuthor {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new NotFoundException(`Книжку з id=${id} не знайдено`);
    }
    return this.withAuthor(book);
  }

  // [НОВЕ] Потрібен AuthorsService, щоб перевірити, чи можна видаляти автора.
  hasBooksByAuthor(authorId: number): boolean {
    return this.books.some((b) => b.authorId === authorId);
  }

  create(dto: CreateBookDto): BookWithAuthor {
    this.authorsService.findByIdOrThrow(dto.authorId);
    const book: Book = { id: this.nextId, title: dto.title, authorId: dto.authorId, year: dto.year };
    this.nextId += 1;
    this.books.push(book);
    return this.withAuthor(book);
  }

  update(id: number, dto: UpdateBookDto): BookWithAuthor {
    this.findOneOrThrow(id);
    this.authorsService.findByIdOrThrow(dto.authorId);
    const updated: Book = { id, title: dto.title, authorId: dto.authorId, year: dto.year };
    this.books = this.books.map((b) => (b.id === id ? updated : b));
    return this.withAuthor(updated);
  }

  remove(id: number): void {
    this.findOneOrThrow(id);
    this.books = this.books.filter((b) => b.id !== id);
  }
}
