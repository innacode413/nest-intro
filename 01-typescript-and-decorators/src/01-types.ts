/**
 * 01-types.ts
 *
 * Мінімум TypeScript, потрібний, щоб читати код Nest: базові типи,
 * інтерфейси для форми об'єкта (DTO) і union-типи.
 * Запуск: npm run demo:01:1 (з кореня репозиторію)
 *
 * Пов'язані файли: 02-classes.ts (наступний крок - типи всередині класів).
 */

// --- Базові типи -------------------------------------------------------
// TypeScript додає до JavaScript статичну перевірку типів. Якщо спробувати
// присвоїти title число - редактор і компілятор підкажуть про помилку
// ще до запуску коду.
const title: string = 'Кобзар';
const year: number = 1840;
const isAvailable: boolean = true;

// --- Масиви й об'єкти ----------------------------------------------------
const tags: string[] = ['поезія', 'класика'];

// --- interface: описуємо "форму" об'єкта --------------------------------
// interface не існує після компіляції (зникає в JS) - це лише підказка
// для компілятора й редактора, яку форму повинен мати об'єкт.
// Саме так у Nest виглядають DTO (Data Transfer Object) - форма тіла
// запиту, яку очікує контролер.
interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  // знак "?" означає необов'язкове поле
  description?: string;
}

const book: Book = {
  id: 1,
  title,
  author: 'Тарас Шевченко',
  year,
};

// --- Union-типи: "або одне, або інше" -----------------------------------
// Корисно для статусів, режимів тощо.
type BookFormat = 'paper' | 'ebook' | 'audio';

function describeFormat(format: BookFormat): string {
  // TypeScript перевірить, що ми обробили рядок, а не довільний текст
  if (format === 'paper') return 'Паперова книжка';
  if (format === 'ebook') return 'Електронна книжка';
  return 'Аудіокнижка';
}

// --- Типізовані функції: параметри і значення, що повертаються ---------
function formatBook(b: Book): string {
  return `${b.title} (${b.author}, ${b.year})`;
}

console.log('--- 01-types.ts ---');
console.log(formatBook(book));
console.log(describeFormat('ebook'));
console.log('Теги:', tags.join(', '));
console.log('Чи доступна:', isAvailable);
