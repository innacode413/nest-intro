/**
 * authors.module.task3.solution.ts
 * Завдання 3. Скопіюйте в ../../app/src/authors/authors.module.ts.
 */
import { forwardRef, Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { BooksModule } from '../books/books.module';

@Module({
  // [НОВЕ] forwardRef(() => BooksModule) - те саме рішення, що і в
  // books.module.ts, але в протилежний бік.
  imports: [forwardRef(() => BooksModule)],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
