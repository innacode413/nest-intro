/**
 * books.module.task3.solution.ts
 * Завдання 3. Скопіюйте в ../../app/src/books/books.module.ts.
 */
import { forwardRef, Module } from '@nestjs/common';
import { AuthorsModule } from '../authors/authors.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  // [НОВЕ] forwardRef(() => AuthorsModule) замість прямого AuthorsModule -
  // бо AuthorsModule тепер теж імпортує BooksModule.
  imports: [forwardRef(() => AuthorsModule)],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
