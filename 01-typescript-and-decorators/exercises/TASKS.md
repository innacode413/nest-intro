# Завдання: TypeScript і декоратори

Розв'язки лежать у [`solutions/`](./solutions/) з такою ж нумерацією.
Кожен файл можна запустити окремо: `npx ts-node --project ../../tsconfig.json exercises/solutions/01-genre.ts`
(шлях наведений відносно `01-typescript-and-decorators/`).

## Завдання 1 (просте): додати жанр книжки

Візьміть інтерфейс `Book` з `src/01-types.ts` і:

1. Додайте union-тип `BookGenre = 'fiction' | 'non-fiction' | 'poetry'`.
2. Додайте до `Book` обов'язкове поле `genre: BookGenre`.
3. Напишіть функцію `isFiction(book: Book): boolean`, яка повертає `true`,
   якщо жанр `'fiction'` або `'poetry'`.

<details>
<summary>Підказка</summary>

Union-тип оголошується так само, як `BookFormat` у `01-types.ts`:
`type BookGenre = 'a' | 'b' | 'c';`. Усередині функції можна звичайним
`===` звіряти значення `genre`.

</details>

## Завдання 2 (середнє): клас Library з parameter properties

Напишіть клас `Library`, який:

1. У конструкторі приймає `books: Book[]` як `private readonly` поле
   (parameter property, як у `BookShelf` з `02-classes.ts`).
2. Має метод `add(book: Book): void`, що додає книжку в масив.
3. Має метод `remove(id: number): boolean`, що видаляє книжку за `id`
   і повертає `true`, якщо книжку було знайдено й видалено, інакше `false`.

<details>
<summary>Підказка</summary>

`remove` можна реалізувати через `findIndex` + `splice`, так само, як
у `00-why-nest/express-app/server.js` для DELETE /books/:id.

</details>

## Завдання 3 (складніше): декоратор @Count

Напишіть декоратор методу `@Count`, який рахує, скільки разів метод
було викликано, і зберігає цей рахунок через `Reflect.defineMetadata`
(ключ, наприклад, `'app:call-count'`) так, щоб його можна було прочитати
ззовні через `Reflect.getMetadata('app:call-count', екземпляр)`.

<details>
<summary>Підказка</summary>

Усередині `descriptor.value = function (...args) { ... }` з прикладу
`LogCall` з `03-decorators.ts` можна читати поточне значення метадані
на `this` (`Reflect.getMetadata(key, this) ?? 0`), збільшувати на 1
і записувати назад через `Reflect.defineMetadata(key, newValue, this)`
перед викликом оригінального методу.

</details>
