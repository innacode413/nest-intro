/**
 * reviews.module.ts
 *
 * ReviewsModule - "коробка" з усім, що стосується рецензій.
 *
 * imports: [forwardRef(() => BooksModule)] - ReviewsService має
 * перевіряти, що книжка існує, і для цього просить BooksService.
 * Але BooksModule імпортує ReviewsModule у відповідь (щоб BooksService
 * рахував середній рейтинг), тому залежність циклічна. forwardRef()
 * каже Nest: "не розв'язуй її зараз, почекай, поки обидва класи
 * існуватимуть".
 *
 * exports: [ReviewsService] - робить ReviewsService видимим для
 * BooksModule, який імпортує цей модуль.
 * Пов'язаний файл: ../books/books.module.ts (імпортує цей модуль).
 */
import { Module, forwardRef } from '@nestjs/common';
import { BooksModule } from '../books/books.module';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [forwardRef(() => BooksModule)],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
