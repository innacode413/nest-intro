/**
 * books.controller.ts
 *
 * Контролер книжок на Nest. Увага: тут навмисно НЕМАЄ окремого
 * сервісу - вся "база даних" і логіка живуть прямо в контролері,
 * так само, як у Express-версії цієї теми. Це свідомий крок:
 * у темі 04-services-and-di ми винесемо цю логіку в BooksService
 * і побачимо, навіщо це потрібно. Пов'язані файли:
 * ../../express-version/server.js (та ж логіка на Express),
 * dto/create-book.dto.ts, dto/update-book.dto.ts, book.interface.ts.
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  BadRequestException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Book } from './book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

// @Controller('books') - усі маршрути цього класу матимуть префікс /books.
// Еквівалент express.Router(), змонтованого через app.use('/books', router).
@Controller('books')
export class BooksController {
  private books: Book[] = [
    { id: 1, title: 'Кобзар', author: 'Тарас Шевченко', year: 1840 },
    { id: 2, title: 'Тигролови', author: 'Іван Багряний', year: 1944 },
    { id: 3, title: 'Місто', author: 'Валер\'ян Підмогильний', year: 1928 },
  ];
  private nextId = 4;

  // Допоміжний метод, щоб не повторювати перевірку id в кожному роуті.
  // Навіть тут, у контролері, видно користь виділення спільної логіки -
  // а в темі 04 ми винесемо її ще далі, у сервіс.
  private parseId(id: string): number {
    const parsed = Number(id);
    if (Number.isNaN(parsed)) {
      // NotFoundException/BadRequestException - вбудовані класи Nest.
      // Nest сам перетворює їх на HTTP-відповідь з потрібним статусом
      // і JSON-тілом { statusCode, message, error } - без ручного
      // res.status(400).json(...), як в Express.
      throw new BadRequestException({message: 'id має бути числом'});
    }
    return parsed;
  }

  private findBookOrThrow(id: number): Book {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new NotFoundException(`Книжку з id=${id} не знайдено`);
    }
    return book;
  }

  // @Get() без аргументу - GET /books
  // @Query('author') дістає значення з query-рядка, напр. /books?author=Шевченко
  @Get()
  findAll(@Query('author') author?: string): Book[] {
    if (!author) {
      return this.books;
    }
    return this.books.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase()),
    );
  }

  // @Get(':id') - GET /books/42. @Param('id') дістає значення з URL.
  @Get(':id')
  findOne(@Param('id') id: string): Book {
    // Тут ми вручну робимо Number(id) і самі перевіряємо NaN.
    // У Nest для саме цього існує вбудований ParseIntPipe
    // (@Param('id', ParseIntPipe) id: number), який робить те саме
    // автоматично і навіть сам кидає помилку 400 - але Pipes виходять
    // за межі цього уроку, тож робимо це явно руками, щоб було видно
    // логіку. Детальніше про Pipes - у 06-summary.
    const parsedId = this.parseId(id);
    return this.findBookOrThrow(parsedId);
  }

  // @Body() дістає весь розпарсений JSON з тіла запиту й "мапить"
  // його на клас CreateBookDto.
  @Post()
  create(@Body() dto: CreateBookDto): Book {
    const book: Book = {
      id: this.nextId,
      title: dto.title,
      author: dto.author,
      year: dto.year,
    };
    this.nextId += 1;
    this.books.push(book);
    // Nest сам поверне статус 201 Created для POST - це дефолт.
    return book;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookDto): Book {
    const parsedId = this.parseId(id);
    this.findBookOrThrow(parsedId);

    const updated: Book = {
      id: parsedId,
      title: dto.title,
      author: dto.author,
      year: dto.year,
    };
    this.books = this.books.map((b) => (b.id === parsedId ? updated : b));
    return updated;
  }

  @Delete(':id')
  // За замовчуванням Nest повертає 200 навіть для DELETE - @HttpCode(204)
  // явно перемикає статус-код на "видалено, тіла відповіді немає",
  // так само, як res.status(204).send() в Express.
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    const parsedId = this.parseId(id);
    this.findBookOrThrow(parsedId);
    this.books = this.books.filter((b) => b.id !== parsedId);
  }
}
