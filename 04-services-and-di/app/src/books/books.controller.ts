/**
 * books.controller.ts
 *
 * [НОВЕ] Порівняйте з тим самим файлом у темі 03: тут не лишилось
 * жодної бізнес-логіки й жодної роботи з масивом books - лише HTTP
 * (параметри запиту, статус-коди) і один виклик методу сервісу.
 * Пов'язаний файл: books.service.ts (уся логіка тепер там).
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
  // [НОВЕ] Dependency Injection: ми НЕ пишемо `new BooksService()`.
  // Nest бачить у конструкторі параметр типу BooksService, бачить,
  // що BooksService зареєстрований у providers модуля (app.module.ts),
  // сам створює його екземпляр і підставляє сюди. Той самий механізм,
  // що ми писали вручну в 04-services-and-di/di-from-scratch/container.ts.
  constructor(private readonly booksService: BooksService) {}

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
