/**
 * authors.controller.ts
 * HTTP-шар авторів - тонкий контролер, уся логіка в AuthorsService.
 * Пов'язаний файл: authors.module.ts.
 */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { Author } from './author.interface';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll(): Author[] {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Author {
    return this.authorsService.findByIdOrThrow(this.authorsService.parseId(id));
  }

  @Post()
  create(@Body() dto: CreateAuthorDto): Author {
    return this.authorsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAuthorDto): Author {
    return this.authorsService.update(this.authorsService.parseId(id), dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.authorsService.remove(this.authorsService.parseId(id));
  }
}
