/**
 * index.ts
 *
 * Демонстрація міні-контейнера з container.ts на тих самих книжках.
 * Запуск: npm run start:04:di (з кореня репозиторію).
 *
 * Порівняйте з app/src/books/books.service.ts і books.controller.ts -
 * це той самий принцип (конструктор просить залежність, щось третє
 * її створює і підставляє), тільки замість нашого резолвера тут буде
 * сам Nest.
 */
import { Injectable, resolve } from './container';

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

// BooksRepository ні від кого не залежить - decorator тут не потрібен,
// бо конструктор без параметрів (немає що записувати в design:paramtypes).
class BooksRepository {
  private books: Book[] = [
    { id: 1, title: 'Кобзар', author: 'Тарас Шевченко', year: 1840 },
  ];

  findAll(): Book[] {
    return this.books;
  }
}

// А BooksService залежить від BooksRepository - і щоб TypeScript
// згенерував для цього класу design:paramtypes, йому потрібен
// БУДЬ-ЯКИЙ декоратор. Саме для цього існує @Injectable().
@Injectable()
class BooksService {
  constructor(private readonly repository: BooksRepository) {}

  listTitles(): string[] {
    return this.repository.findAll().map((b) => b.title);
  }
}

console.log('--- di-from-scratch/index.ts ---');

// Ми НІДЕ не написали new BooksRepository() чи new BooksService(...).
// Контейнер сам прочитав, що BooksService потребує BooksRepository,
// сам створив BooksRepository і підставив його в конструктор BooksService.
const service = resolve(BooksService);
console.log('Назви книжок:', service.listTitles());

// Перевірка, що це справді singleton - той самий екземпляр щоразу:
const serviceAgain = resolve(BooksService);
console.log('Це той самий екземпляр:', service === serviceAgain);
