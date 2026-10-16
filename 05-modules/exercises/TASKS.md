# Завдання: Modules

Працюйте у `../app/src/`. Розв'язки - у [`solutions/`](./solutions/)
з тими самими іменами файлів і коментарем `[НОВЕ]` на змінених рядках.
Щоб перевірити розв'язок - скопіюйте відповідні файли на вказані в
кожному з них шляхи і перезапустіть `npm run start:05`.

## Завдання 1 (просте): фільтр книжок за країною автора

Додайте в `GET /books` необов'язковий query-параметр `country`.
Якщо передано - показуйте тільки книжки, автори яких з цієї країни.

<details>
<summary>Підказка</summary>

`BooksService` уже має доступ до `AuthorsService` (він інжектований у
конструкторі). Усередині `findAll()` можна для кожної книжки дістати
автора через `this.authorsService.findByIdOrThrow(book.authorId)` і
порівняти `author.country` з параметром.

</details>

## Завдання 2 (середнє): StatsModule

Створіть новий, третій модуль `StatsModule` (`src/stats/`) з
контролером `StatsController` і маршрутом `GET /stats/summary`, який
повертає `{ totalBooks: number, totalAuthors: number }`.

Щоб це зробити, `StatsModule` має імпортувати і `BooksModule`, і
`AuthorsModule` - а значить, обидва ці модулі мають **експортувати**
свої сервіси (`AuthorsModule` вже експортує `AuthorsService`;
`BooksModule` поки НЕ експортує `BooksService` - потрібно додати).

<details>
<summary>Підказка</summary>

Без `exports: [BooksService]` у `BooksModule` ви отримаєте знайому
помилку `Nest can't resolve dependencies of the StatsService (?)` -
той самий симптом, що й у темі 04, але тепер причина на рівні
модулів, а не окремого провайдера. Не забудьте додати `StatsModule`
в `imports` кореневого `AppModule`.

</details>

## Завдання 3 (складніше): заборонити видаляти автора з книжками

Зробіть так, щоб `DELETE /authors/:id` повертав `400 Bad Request`
("Не можна видалити автора, у якого є книжки"), якщо в цього автора
є хоча б одна книжка. Для цього `AuthorsService` має запитати
`BooksService`, чи є книжки з таким `authorId`.

<details>
<summary>Підказка - тут є пастка</summary>

`BooksModule` вже імпортує `AuthorsModule` (щоб `BooksService` міг
використовувати `AuthorsService`). Якщо тепер `AuthorsModule`
імпортує `BooksModule` у відповідь - виникає **циклічна залежність
модулів** (A імпортує B, B імпортує A). Nest не може розв'язати таке
напряму й кидає помилку про циклічну залежність під час старту.

Рішення - `forwardRef()` з `@nestjs/common`, застосований **в обох
модулях** (в `imports`) і **в обох сервісах** (на параметрі
конструктора через `@Inject(forwardRef(() => XService))`):

```ts
// у модулі
imports: [forwardRef(() => BooksModule)]

// у сервісі
constructor(
  @Inject(forwardRef(() => BooksService))
  private readonly booksService: BooksService,
) {}
```

Це наче каже Nest: "не намагайся розв'язати цю залежність прямо
зараз під час читання файлу - почекай, поки обидва класи точно
існуватимуть, і розв'яжи її тоді". Детальніше - офіційна документація
в розділі "Корисні посилання" нижче.

</details>

## Корисні посилання до завдання 3

- [NestJS - Circular dependency](https://docs.nestjs.com/fundamentals/circular-dependency)
