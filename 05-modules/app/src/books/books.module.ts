/**
 * books.module.ts
 *
 * [НОВЕ] imports: [AuthorsModule] - саме цей рядок дозволяє
 * BooksService отримати AuthorsService через конструктор. Без
 * цього імпорту Nest кидав би ту саму помилку
 * "Nest can't resolve dependencies", що ми вже бачили в темі 04 -
 * тільки тепер причина не "забули providers", а "забули imports".
 * Пов'язаний файл: ../authors/authors.module.ts (звідки імпортуємо),
 * books.service.ts (використовує AuthorsService).
 *
 * [НОВЕ] forwardRef(() => ReviewsModule) - ReviewsModule імпортує
 * BooksModule, щоб ReviewsService міг перевіряти існування книжки.
 * Щоб BooksService міг рахувати середній рейтинг,BooksModule мусить
 * імпортувати ReviewsModule у відповідь - це цикл, і Nest розв'язує
 * його лише через forwardRef (див. exercises/TASKS.md, завдання 3).
 *
 * [НОВЕ] exports: [BooksService] - без цього рядка ReviewsModule не
 * зможе отримати BooksService, як і AuthorsModule не міг би отримати
 * його раніше (див. authors.module.ts).
 */
import { Module, forwardRef } from '@nestjs/common';
import { AuthorsModule } from '../authors/authors.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [AuthorsModule, forwardRef(() => ReviewsModule)],
  controllers: [BooksController],
  providers: [BooksService],
  // exports: робить BooksService видимим для модулів, які
  // імпортують BooksModule (тут - ReviewsModule).
  exports: [BooksService],
})
export class BooksModule {}
