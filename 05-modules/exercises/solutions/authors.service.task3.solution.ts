/**
 * authors.service.task3.solution.ts
 * Завдання 3. Скопіюйте в ../../app/src/authors/authors.service.ts.
 */
import { forwardRef, Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Author } from './author.interface';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { BooksService } from '../books/books.service';

@Injectable()
export class AuthorsService {
  // [НОВЕ] Та сама конструкція forwardRef, тільки в інший бік:
  // AuthorsService тепер залежить від BooksService.
  constructor(
    @Inject(forwardRef(() => BooksService))
    private readonly booksService: BooksService,
  ) {}

  private authors: Author[] = [
    { id: 1, name: 'Тарас Шевченко', country: 'Україна' },
    { id: 2, name: 'Іван Багряний', country: 'Україна' },
  ];
  private nextId = 3;

  parseId(id: string): number {
    const parsed = Number(id);
    if (Number.isNaN(parsed)) {
      throw new BadRequestException('id має бути числом');
    }
    return parsed;
  }

  findAll(): Author[] {
    return this.authors;
  }

  findByIdOrThrow(id: number): Author {
    const author = this.authors.find((a) => a.id === id);
    if (!author) {
      throw new NotFoundException(`Автора з id=${id} не знайдено`);
    }
    return author;
  }

  create(dto: CreateAuthorDto): Author {
    const author: Author = { id: this.nextId, name: dto.name, country: dto.country };
    this.nextId += 1;
    this.authors.push(author);
    return author;
  }

  update(id: number, dto: UpdateAuthorDto): Author {
    this.findByIdOrThrow(id);
    const updated: Author = { id, name: dto.name, country: dto.country };
    this.authors = this.authors.map((a) => (a.id === id ? updated : a));
    return updated;
  }

  // [НОВЕ] Перевірка через BooksService перед видаленням.
  remove(id: number): void {
    this.findByIdOrThrow(id);
    if (this.booksService.hasBooksByAuthor(id)) {
      throw new BadRequestException('Не можна видалити автора, у якого є книжки');
    }
    this.authors = this.authors.filter((a) => a.id !== id);
  }
}
