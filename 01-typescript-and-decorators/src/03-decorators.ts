/**
 * 03-decorators.ts
 *
 * Що таке декоратор - насправді, без магії. Декоратор - це звичайна
 * функція, яку TypeScript викликає під час визначення класу і яка
 * отримує доступ до цього класу (або методу, або властивості).
 * Запуск: npm run demo:01:3
 *
 * Nest побудований на декораторах (@Controller, @Get, @Injectable,
 * @Module) - і це той самий механізм, що й тут, лише складніший
 * усередині. Пов'язані файли: 04-metadata.ts (як декоратор запам'ятовує
 * інформацію про клас).
 *
 * ВАЖЛИВО: цей механізм (experimentalDecorators) - "legacy"-декоратори
 * TypeScript, саме їх використовує Nest. Є новіший стандарт декораторів
 * (TC39 stage 3) з іншим синтаксисом сигнатур - Nest на нього ще не
 * перейшов, тому в tsconfig.json ми явно ставимо
 * "experimentalDecorators": true.
 */

// --- Декоратор класу ------------------------------------------------------
// Клас-декоратор отримує один аргумент - сам конструктор класу.
// Тут ми просто друкуємо, що клас був "зареєстрований" - рівно так
// Nest під капотом позначає клас як контролер чи сервіс.
function Component(target: Function) {
  console.log(`[Component] зареєстровано клас: ${target.name}`);
}

@Component
class BookCatalog {
  list(): string[] {
    return ['Кобзар', 'Тигролови'];
  }
}

// --- Декоратор методу -------------------------------------------------
// Метод-декоратор отримує: (1) прототип класу, (2) ім'я методу,
// (3) property descriptor - об'єкт, що описує сам метод і дозволяє
// його підмінити. Тут ми "обгортаємо" оригінальний метод логуванням
// до і після виклику - типовий приклад того, що робить @Get() у Nest
// (підписує метод на обробку HTTP-запиту) або interceptor.
function LogCall(
  _target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const original = descriptor.value;

  descriptor.value = function (...args: unknown[]) {
    console.log(`[LogCall] -> викликаємо ${propertyKey}(${args.join(', ')})`);
    const result = original.apply(this, args);
    console.log(`[LogCall] <- ${propertyKey} повернув:`, result);
    return result;
  };
}

class Greeter {
  @LogCall
  greet(name: string): string {
    return `Привіт, ${name}!`;
  }
}

// --- Декоратор властивості ------------------------------------------------
// Property-декоратор отримує (1) прототип і (2) ім'я властивості.
// Сам по собі він НЕ може задати значення властивості (для цього
// у "справжніх" бібліотеках комбінують декоратор + reflect-metadata,
// див. 04-metadata.ts), але може, наприклад, записати в спеціальний
// журнал, які поля клас вважає "важливими".
const trackedFields = new Map<Function, string[]>();

function Tracked(target: object, propertyKey: string) {
  const ctor = target.constructor;
  const existing = trackedFields.get(ctor) ?? [];
  trackedFields.set(ctor, [...existing, propertyKey]);
}

class Author {
  @Tracked
  name!: string;

  @Tracked
  country!: string;

  biography?: string;
}

console.log('--- 03-decorators.ts ---');
const catalog = new BookCatalog();
console.log('Каталог:', catalog.list());

const greeter = new Greeter();
greeter.greet('студенте');

console.log('Відстежувані поля Author:', trackedFields.get(Author));

// Висновок: @Component, @LogCall і @Tracked - це звичайні функції.
// @Controller(), @Get(), @Injectable() у Nest працюють за тим самим
// принципом, тільки замість console.log вони записують метадані
// (у спеціальне "сховище" через reflect-metadata), які потім читає
// Nest під час старту застосунку, щоб побудувати маршрути й граф
// залежностей. Це і є тема наступного файлу.
