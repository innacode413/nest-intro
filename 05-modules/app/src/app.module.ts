/**
 * app.module.ts
 *
 * [НОВЕ] Кореневий модуль тепер сам нічого не реєструє напряму
 * (controllers/providers порожні) - він лише ІМПОРТУЄ три менші
 * модулі, кожен відповідає за свою частину домену. Пов'язані файли:
 * books/books.module.ts, authors/authors.module.ts, reviews/reviews.module.ts.
 */
import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [BooksModule, AuthorsModule, ReviewsModule],
})
export class AppModule {}
