# 01. Мінімум TypeScript і декоратори

## 1. Мета

Після цієї теми студент зможе:

- читати базові типи, `interface` і union-типи в чужому коді;
- впізнавати "parameter properties" (`constructor(private readonly x: X)`)
  і розуміти, що це звичайний TypeScript, а не особливість Nest;
- пояснити, що декоратор - це звичайна функція, яку викликає компілятор;
- пояснити, як `reflect-metadata` і `emitDecoratorMetadata` дозволяють
  декоратору "запам'ятати" інформацію про клас для подальшого читання.

## 2. Таймінг на уроці

| Хвилини | Що показуємо |
|---|---|
| 25-30 | `src/01-types.ts` - типи, interface, union |
| 30-35 | `src/02-classes.ts` - класи, parameter properties |
| 35-38 | `src/03-decorators.ts` - декоратор як функція |
| 38-40 | `src/04-metadata.ts` - reflect-metadata, design:paramtypes |

## 3. Теорія

### 3.1. Навіщо взагалі TypeScript тут

TypeScript додає до JavaScript **статичну перевірку типів**: помилки
типу "очікували число, а передали рядок" компілятор знаходить ще
до запуску коду, прямо в редакторі. Nest написаний на TypeScript і
активно використовує його можливості, тому мінімальне знання
синтаксису потрібне, щоб просто читати код Nest-застосунку.

### 3.2. Legacy-декоратори: чому саме вони

У TypeScript є **два** різні механізми декораторів:

1. "legacy" / experimental (`experimentalDecorators: true`) - старіший,
   саме його використовує Nest.
2. Новий стандарт TC39 stage 3 (декоратори за замовчуванням у нових
   проєктах) - інший синтаксис сигнатур функцій-декораторів.

Nest ще не перейшов на новий стандарт, тому в `tsconfig.json` цієї
теми (і всього репозиторію) явно увімкнено:

```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```

**Технічна примітка:** приклади цієї теми запускаються через `ts-node`
(компілятор `tsc`, викликаний "на льоту"), а не через `tsx`/`esbuild.
Причина: `esbuild` (а разом з ним `tsx`) не підтримує `emitDecoratorMetadata`
- він транспілює файли по одному, без повного аналізу типів, а саме
повний аналіз типів потрібен, щоб згенерувати `design:paramtypes`
(див. `04-metadata.ts`). Якщо запустити ці приклади через `tsx`,
`Reflect.getMetadata('design:paramtypes', ...)` поверне `undefined`.

## 5. Розбір коду

Файли в [`src/`](./src/) пронумеровані - читайте в порядку номерів:

- **`01-types.ts`** - базові типи, `interface Book` (DTO-подібна форма),
  union-тип `BookFormat`.
- **`02-classes.ts`** - клас `BookShelfVerbose` (явний запис) і
  `BookShelf` (той самий клас через parameter properties) поруч, щоб
  побачити, що це однаковий код, записаний по-різному.
- **`03-decorators.ts`** - три власноручно написані декоратори:
  класу (`@Component`), методу (`@LogCall`) і властивості (`@Tracked`) -
  усі - звичайні функції, жодної залежності від Nest.
- **`04-metadata.ts`** - `Reflect.defineMetadata`/`getMetadata` і
  автоматичний `design:paramtypes`, який TypeScript сам генерує для
  класу з декоратором. Це саме той механізм, яким Nest дізнається,
  "що треба підставити" в конструктор.

## 6. Express vs Nest

У цій темі ще немає HTTP-коду, тому порівняння інше - **звичайний клас
проти Nest-сервісу**:

| | Звичайний TS-клас | Nest `@Injectable()`-сервіс |
|---|---|---|
| Створення екземпляра | `new BooksService(new BooksRepository())` вручну | Nest створює автоматично |
| Звідки Nest знає залежності | - | З `design:paramtypes` (тема цього файлу) |
| Чи потрібен декоратор | Ні | Так, `@Injectable()` - маркер для Nest |

## 7. Як запустити

```bash
# з кореня репозиторію
npm run demo:01:1   # 01-types.ts
npm run demo:01:2   # 02-classes.ts
npm run demo:01:3   # 03-decorators.ts
npm run demo:01:4   # 04-metadata.ts
```

Або напряму з цієї папки:

```bash
npx ts-node --project tsconfig.json src/01-types.ts
```

## 8. Типові помилки

- **`Cannot find name 'console'`** - в `tsconfig.json` не вказано
  `"types": ["node"]` (або не встановлено `@types/node`). Виправлено
  в базовому `tsconfig.base.json` цього репозиторію.
- **`Reflect.getMetadata` повертає `undefined`** замість масиву типів -
  найчастіша причина: файл запущено через `tsx`/`esbuild` (не підтримує
  `emitDecoratorMetadata`), або в `tsconfig.json` не увімкнено
  `emitDecoratorMetadata`.
- **`Unable to resolve signature of class decorator`** - декоратор
  застосовано без дужок там, де очікується фабрика (`@Role` замість
  `@Role('x')`), або навпаки.

## 9. Питання для самоперевірки

1. Що залишається від `interface` після компіляції в JavaScript?
   <details><summary>Відповідь</summary>Нічого - interface існує тільки на етапі перевірки типів і повністю зникає в згенерованому JS.</details>

2. Що саме отримує метод-декоратор як третій аргумент?
   <details><summary>Відповідь</summary>PropertyDescriptor - об'єкт, що описує метод і дозволяє підмінити його реалізацію (`descriptor.value`).</details>

3. Звідки Nest дізнається типи параметрів конструктора сервісу?
   <details><summary>Відповідь</summary>З метадані `design:paramtypes`, яку TypeScript автоматично генерує для класів з декоратором, коли увімкнено `emitDecoratorMetadata`.</details>

4. Чому в прикладах цієй теми не можна використати `tsx` замість `ts-node`?
   <details><summary>Відповідь</summary>`tsx` працює через `esbuild`, який не підтримує `emitDecoratorMetadata` (транспілює файли окремо, без повного аналізу типів).</details>

5. Що таке "parameter property" в TypeScript?
   <details><summary>Відповідь</summary>Скорочений запис, коли модифікатор доступу (private/public/protected) перед параметром конструктора змушує TypeScript самостійно створити однойменне поле класу й присвоїти йому значення параметра.</details>

## 10. Практика

Завдання - у [`exercises/TASKS.md`](./exercises/TASKS.md), розв'язки -
у [`exercises/solutions/`](./exercises/solutions/).

## 11. Корисні посилання

- [TypeScript Handbook - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript Handbook - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [TypeScript Handbook - Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [NestJS - Custom decorators](https://docs.nestjs.com/custom-decorators)
- [MDN - Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
