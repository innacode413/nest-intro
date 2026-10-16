/**
 * books.controller.solution.ts
 * Додає GET /books/stats (завдання 1). Скопіюйте в
 * ../../app/src/books/books.controller.ts.
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Book } from './book.interface';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // [НОВЕ] Має стояти ВИЩЕ @Get(':id'), інакше "stats" сприймається як :id.
  @Get('stats')
  getStats() {
    return this.booksService.getStats();
  }

  @Get()
  findAll(@Query('author') author?: string): Book[] {
    return this.booksService.findAll(author);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Book {
    const parsedId = this.booksService.parseId(id);
    return this.booksService.findOneOrThrow(parsedId);
  }

  @Post()
  create(@Body() dto: CreateBookDto): Book {
    return this.booksService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookDto): Book {
    const parsedId = this.booksService.parseId(id);
    return this.booksService.update(parsedId, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    const parsedId = this.booksService.parseId(id);
    this.booksService.remove(parsedId);
  }
}
