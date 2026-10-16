/**
 * books.controller.solution.ts
 *
 * Розв'язок усіх трьох завдань теми 03. Щоб перевірити в дії -
 * скопіюйте вміст цього файлу в
 * ../../nest-version/src/books/books.controller.ts і перезапустіть
 * `npm run start:03` з кореня репозиторію.
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  BadRequestException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
// Шляхи імпортів нижче написані так, якби файл уже лежав у
// ../../nest-version/src/books/books.controller.ts (саме туди його
// і потрібно скопіювати).
import { Book } from './book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  private books: Book[] = [
    { id: 1, title: 'Кобзар', author: 'Тарас Шевченко', year: 1840 },
    { id: 2, title: 'Тигролови', author: 'Іван Багряний', year: 1944 },
    { id: 3, title: 'Місто', author: 'Валер\'ян Підмогильний', year: 1928 },
  ];
  private nextId = 4;

  private parseId(id: string): number {
    const parsed = Number(id);
    if (Number.isNaN(parsed)) {
      throw new BadRequestException('id має бути числом');
    }
    return parsed;
  }

  private findBookOrThrow(id: number): Book {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new NotFoundException(`Книжку з id=${id} не знайдено`);
    }
    return book;
  }

  // [НОВЕ] Завдання 1: GET /books/latest. Має стояти ВИЩЕ findOne(':id'),
  // інакше Nest сприйме "latest" як значення :id.
  @Get('latest')
  findLatest(): Book {
    if (this.books.length === 0) {
      throw new NotFoundException('Книжок ще немає');
    }
    return this.books.reduce((max, b) => (b.id > max.id ? b : max));
  }

  @Get()
  findAll(
    @Query('author') author?: string,
    // [НОВЕ] Завдання 2: діапазон років
    @Query('yearFrom') yearFrom?: string,
    @Query('yearTo') yearTo?: string,
  ): Book[] {
    let result = this.books;

    if (author) {
      result = result.filter((b) =>
        b.author.toLowerCase().includes(author.toLowerCase()),
      );
    }

    if (yearFrom) {
      const from = Number(yearFrom);
      result = result.filter((b) => b.year >= from);
    }

    if (yearTo) {
      const to = Number(yearTo);
      result = result.filter((b) => b.year <= to);
    }

    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Book {
    const parsedId = this.parseId(id);
    return this.findBookOrThrow(parsedId);
  }

  @Post()
  create(@Body() dto: CreateBookDto): Book {
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

  // [НОВЕ] Завдання 3: дублювання книжки
  @Post(':id/duplicate')
  duplicate(@Param('id') id: string): Book {
    const parsedId = this.parseId(id);
    const original = this.findBookOrThrow(parsedId);

    const copy: Book = {
      id: this.nextId,
      title: original.title,
      author: original.author,
      year: original.year,
    };
    this.nextId += 1;
    this.books.push(copy);
    return copy;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookDto): Book {
    const parsedId = this.parseId(id);
    this.findBookOrThrow(parsedId);

    const updated: Book = {
      id: parsedId,
      title: dto.title,
      author: dto.author,
      year: dto.year,
    };
    this.books = this.books.map((b) => (b.id === parsedId ? updated : b));
    return updated;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    const parsedId = this.parseId(id);
    this.findBookOrThrow(parsedId);
    this.books = this.books.filter((b) => b.id !== parsedId);
  }
}
