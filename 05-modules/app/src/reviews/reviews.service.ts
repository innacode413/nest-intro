/**
 * reviews.service.ts
 * Бізнес-логіка рецензій. Пов'язані файли: reviews.module.ts (реєструє
 * і експортує цей сервіс), ../books/books.service.ts (ReviewsService
 * запитує BooksService, а BooksService - цей сервіс, тому що потрібні
 * forwardRef в обох модулях і обох сервісах).
 */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { BooksService } from '../books/books.service';
import { Review } from './review.interface';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  // ReviewsModule імпортує BooksModule, щоб перевіряти існування книжки.
  // У відповідь BooksModule імпортує ReviewsModule (див. books.module.ts),
  // тому залежність циклічна і її треба розв'язати через forwardRef -
  // так само, як у завданні 3 з exercises/TASKS.md.
  constructor(
    @Inject(forwardRef(() => BooksService))
    private readonly booksService: BooksService,
  ) {}

  private reviews: Review[] = [
    { id: 1, bookId: 1, text: 'Незламна класика, читається легко.', rating: 5 },
  ];
  private nextId = 2;

  parseId(id: string): number {
    const parsed = Number(id);
    if (Number.isNaN(parsed)) {
      throw new BadRequestException('id має бути числом');
    }
    return parsed;
  }

  // bookId приходить з query-строки (?bookId=1), тому це теж рядок.
  parseBookId(bookId: string): number {
    const parsed = Number(bookId);
    if (Number.isNaN(parsed)) {
      throw new BadRequestException('bookId має бути числом');
    }
    return parsed;
  }

  // Перевірка діапазону rating - вручну, як у темі 00: Pipes і
  // class-validator тут навмисно не використовуються.
  private validate(dto: CreateReviewDto): void {
    if (!Number.isInteger(dto.bookId)) {
      throw new BadRequestException('bookId має бути цілим числом');
    }
    if (typeof dto.text !== 'string' || dto.text.trim() === '') {
      throw new BadRequestException("text є обов'язковим рядком");
    }
    if (!Number.isInteger(dto.rating) || dto.rating < 1 || dto.rating > 5) {
      throw new BadRequestException('rating має бути цілим числом від 1 до 5');
    }
  }

  findAll(bookId?: number): Review[] {
    if (bookId === undefined) {
      return this.reviews;
    }
    return this.reviews.filter((r) => r.bookId === bookId);
  }

  create(dto: CreateReviewDto): Review {
    this.validate(dto);
    // Книжку не шукаємо власним масивом - просимо BooksService, щоб
    // ReviewsModule не дублював його логіку. Немає книжки - 404.
    this.booksService.findOneOrThrow(dto.bookId);

    const review: Review = {
      id: this.nextId,
      bookId: dto.bookId,
      text: dto.text,
      rating: dto.rating,
    };
    this.nextId += 1;
    this.reviews.push(review);
    return review;
  }

  remove(id: number): void {
    const review = this.reviews.find((r) => r.id === id);
    if (!review) {
      throw new NotFoundException(`Рецензію з id=${id} не знайдено`);
    }
    this.reviews = this.reviews.filter((r) => r.id !== id);
  }

  // Середній рейтинг книжки за всіма її рецензіями. null, якщо
  // рецензій ще немає. Використовується BooksService.averageRating.
  averageRatingForBook(bookId: number): number | null {
    const ratings = this.reviews.filter((r) => r.bookId === bookId).map((r) => r.rating);
    if (ratings.length === 0) {
      return null;
    }
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return Math.round((sum / ratings.length) * 100) / 100;
  }
}
