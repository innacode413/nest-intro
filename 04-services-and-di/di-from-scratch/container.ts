/**
 * container.ts
 *
 * Міні DI-контейнер "з нуля", ~30 рядків без коментарів. Мета - показати,
 * що Dependency Injection у Nest не магія: це Reflect.getMetadata з теми
 * 01-typescript-and-decorators/src/04-metadata.ts, застосований по-справжньому.
 * Пов'язаний файл: index.ts (демонстрація використання).
 */
import 'reflect-metadata';

// @Injectable() - порожній декоратор-маркер. Сам факт, що клас має хоча б
// один декоратор, змушує TypeScript згенерувати для нього метадані
// design:paramtypes (типи параметрів конструктора). Без декоратора
// TypeScript цих метаданих для класу не створює взагалі.
export function Injectable() {
  return function (_target: Function) {};
}

// Реєстр уже створених екземплярів - кожен клас створюється лише один раз
// (singleton), так само, як провайдери в Nest за замовчуванням.
const instances = new Map<Function, unknown>();

// resolve<T>(target) - серце контейнера.
export function resolve<T>(target: new (...args: never[]) => T): T {
  if (instances.has(target)) {
    return instances.get(target) as T;
  }

  // Читаємо типи параметрів конструктора, які TypeScript сам поклав
  // туди під час компіляції (emitDecoratorMetadata: true).
  const paramTypes: Array<new (...args: never[]) => unknown> =
    Reflect.getMetadata('design:paramtypes', target) ?? [];

  // Рекурсивно створюємо (або беремо вже створені) залежності:
  // якщо BooksService залежить від BooksRepository, а BooksRepository
  // ні від кого не залежить - спочатку створиться BooksRepository.
  const dependencies = paramTypes.map((dep) => resolve(dep));

  const instance = new target(...(dependencies as never[]));
  instances.set(target, instance);
  return instance;
}
