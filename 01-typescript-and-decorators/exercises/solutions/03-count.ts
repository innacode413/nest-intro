/**
 * Розв'язок завдання 3: декоратор @Count.
 * Запуск: npx ts-node --project ../../tsconfig.json exercises/solutions/03-count.ts
 */
import 'reflect-metadata';

const COUNT_KEY = 'app:call-count';

function Count(
  _target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const original = descriptor.value;

  descriptor.value = function (...args: unknown[]) {
    const current = (Reflect.getMetadata(COUNT_KEY, this as object) as number) ?? 0;
    Reflect.defineMetadata(COUNT_KEY, current + 1, this as object);
    return original.apply(this, args);
  };

  console.log(`[Count] декоратор застосовано до методу ${propertyKey}`);
}

class Greeter {
  @Count
  greet(name: string): string {
    return `Привіт, ${name}!`;
  }
}

console.log('--- 03-count.ts ---');
const greeter = new Greeter();
greeter.greet('Олено');
greeter.greet('Миколо');
greeter.greet('Ірино');

console.log('Кількість викликів greet:', Reflect.getMetadata(COUNT_KEY, greeter));
