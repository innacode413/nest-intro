/**
 * Розв'язок завдання 2: клас Library.
 * Запуск: npx ts-node --project ../../tsconfig.json exercises/solutions/02-library.ts
 */

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

class Library {
  constructor(private readonly books: Book[]) {}

  add(book: Book): void {
    this.books.push(book);
  }

  remove(id: number): boolean {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) {
      return false;
    }
    this.books.splice(index, 1);
    return true;
  }

  list(): Book[] {
    return this.books;
  }
}

const library = new Library([
  { id: 1, title: 'Кобзар', author: 'Тарас Шевченко', year: 1840 },
]);

console.log('--- 02-library.ts ---');
library.add({ id: 2, title: 'Тигролови', author: 'Іван Багряний', year: 1944 });
console.log('Після add:', library.list());

console.log('remove(1):', library.remove(1));
console.log('remove(999):', library.remove(999));
console.log('Після remove:', library.list());
