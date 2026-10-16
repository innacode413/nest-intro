/**
 * authors.service.ts
 * Бізнес-логіка авторів. Пов'язаний файл: authors.module.ts (реєструє
 * і експортує цей сервіс), ../books/books.service.ts (використовує
 * findByIdOrThrow з іншого модуля).
 */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Author } from './author.interface';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
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

  remove(id: number): void {
    this.findByIdOrThrow(id);
    this.authors = this.authors.filter((a) => a.id !== id);
  }
}
