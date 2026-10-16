/**
 * Розв'язок завдання 1: жанр книжки.
 * Запуск: npx ts-node --project ../../tsconfig.json exercises/solutions/01-genre.ts
 * (команда виконується з папки 01-typescript-and-decorators)
 */

type BookGenre = 'fiction' | 'non-fiction' | 'poetry';

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: BookGenre;
}

function isFiction(book: Book): boolean {
  return book.genre === 'fiction' || book.genre === 'poetry';
}

const kobzar: Book = {
  id: 1,
  title: 'Кобзар',
  author: 'Тарас Шевченко',
  year: 1840,
  genre: 'poetry',
};

console.log('--- 01-genre.ts ---');
console.log(`"${kobzar.title}" це художня книжка:`, isFiction(kobzar));
