/**
 * 02-classes.ts
 *
 * Класи в TypeScript: модифікатори доступу, readonly, "parameter
 * properties" (скорочений запис полів у конструкторі) - саме так
 * у Nest виглядають сервіси й контролери, яким щось "інжектять".
 * Запуск: npm run demo:01:2
 *
 * Пов'язані файли: 01-types.ts (інтерфейс Book використовується тут).
 */

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

// --- Звичний запис класу з явними полями --------------------------------
class BookShelfVerbose {
  // private - поле видно тільки всередині цього класу
  private books: Book[];

  constructor(books: Book[]) {
    this.books = books;
  }

  count(): number {
    return this.books.length;
  }
}

// --- Той самий клас через "parameter properties" ------------------------
// Якщо перед параметром конструктора написати модифікатор доступу
// (private/public/protected) і, за бажанням, readonly - TypeScript
// САМ створить поле класу і сам присвоїть йому значення параметра.
// Це не особливість Nest, а стандартна фіча TypeScript - але Nest
// використовує її в кожному сервісі й контролері, тому важливо впізнавати.
class BookShelf {
  constructor(private readonly books: Book[]) {}
  // ^ це еквівалент BookShelfVerbose вище: без жодного рядка в тілі
  // конструктора в нас уже є this.books, і ззовні його не можна змінити
  // напряму (readonly), і не можна побачити (private).

  count(): number {
    return this.books.length;
  }

  findById(id: number): Book | undefined {
    // Book | undefined - union-тип: функція може або знайти книжку,
    // або не знайти нічого. TypeScript змушує перевірити результат
    // перед використанням.
    return this.books.find((b) => b.id === id);
  }
}

// --- implements: клас зобов'язується відповідати формі інтерфейсу ------
interface Describable {
  describe(): string;
}

class DescribableBookShelf extends BookShelf implements Describable {
  describe(): string {
    return `У полиці ${this.count()} книжок`;
  }
}

const shelf = new DescribableBookShelf([
  { id: 1, title: 'Кобзар', author: 'Тарас Шевченко', year: 1840 },
  { id: 2, title: 'Тигролови', author: 'Іван Багряний', year: 1944 },
]);

console.log('--- 02-classes.ts ---');
console.log(shelf.describe());
console.log('Книжка з id=1:', shelf.findById(1));
console.log('Книжка з id=99:', shelf.findById(99));

// Саме конструктор з параметр-властивостями (private readonly someService)
// ви побачите в кожному Nest-сервісі й контролері, починаючи з теми
// 04-services-and-di - це і є той момент, де Nest "підставляє" залежність.
