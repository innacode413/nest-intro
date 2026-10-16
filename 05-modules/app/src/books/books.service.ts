/**
 * books.service.ts
 *
 * [НОВЕ] BooksService тепер залежить не лише від власних даних, а й
 * від AuthorsService з ІНШОГО модуля (authors/). Це можливо лише
 * тому, що BooksModule імпортує AuthorsModule, а AuthorsModule
 * експортує AuthorsService (див. books.module.ts, authors.module.ts).
 * Пов'язаний файл: books.controller.ts.
 */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { ReviewsService } from '../reviews/reviews.service';
import { Book } from './book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

// Форма відповіді API: книжка + ім'я автора (а не тільки authorId),
// щоб клієнту не треба було робити другий запит в /authors.
export interface BookWithAuthor extends Book {
  authorName: string;
}

@Injectable()
export class BooksService {
  // [НОВЕ] Перший параметр конструктора - залежність з іншого модуля.
  // Для Nest це виглядає так само, як будь-яка інша залежність:
  // AuthorsService зареєстрований (у своєму модулі) і експортований,
  // тож IoC-контейнер може його підставити тут.
  // [НОВЕ] Другий параметр - ReviewsService з ІНШОГО модуля.
  // ReviewsModule імпортує BooksModule (щоб перевіряти існування книжки),
  // тож BooksModule імпортує ReviewsModule у відповідь - це цикл.
  // forwardRef + @Inject кажуть Nest розв'язати цю залежність після
  // того, як обидва класи точно існуватимуть (books.module.ts).
  constructor(
    private readonly authorsService: AuthorsService,
    @Inject(forwardRef(() => ReviewsService))
    private readonly reviewsService: ReviewsService,
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

  create(dto: CreateBookDto): BookWithAuthor {
    // [НОВЕ] Перевіряємо, що автор існує, ЗАПИТУЮЧИ AuthorsService -
    // замість того, щоб BooksService сам щось знав про те, як
    // зберігаються автори. Кожен модуль відповідає тільки за своє.
    this.authorsService.findByIdOrThrow(dto.authorId);

    const book: Book = {
      id: this.nextId,
      title: dto.title,
      authorId: dto.authorId,
      year: dto.year,
    };
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

  // [НОВЕ] Середній рейтинг книжки за всіма її рецензіями; null, якщо
  // рецензій ще немає. Рецензії лежать у ReviewsService - BooksService
  // лише просить їх у іншого модуля, а не тримає власну копію.
  averageRating(bookId: number): number | null {
    this.findOneOrThrow(bookId);
    return this.reviewsService.averageRatingForBook(bookId);
  }
}
