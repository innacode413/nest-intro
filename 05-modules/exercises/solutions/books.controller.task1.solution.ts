/**
 * books.controller.task1.solution.ts
 * Завдання 1: додає @Query('country'). Скопіюйте в
 * ../../app/src/books/books.controller.ts.
 */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { BooksService, BookWithAuthor } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query('country') country?: string): BookWithAuthor[] {
    return this.booksService.findAll(country);
  }

  @Get(':id')
  findOne(@Param('id') id: string): BookWithAuthor {
    return this.booksService.findOneOrThrow(this.booksService.parseId(id));
  }

  @Post()
  create(@Body() dto: CreateBookDto): BookWithAuthor {
    return this.booksService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookDto): BookWithAuthor {
    return this.booksService.update(this.booksService.parseId(id), dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.booksService.remove(this.booksService.parseId(id));
  }
}
