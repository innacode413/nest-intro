# Завдання: Services & Dependency Injection

Працюйте у `../app/src/books/`. Готові розв'язки - у
[`solutions/`](./solutions/), з тими самими назвами файлів. Щоб
перевірити розв'язок у дії - скопіюйте потрібні файли в `app/src/books/`
(і, де сказано, оновіть `app/src/app.module.ts`), потім перезапустіть
`npm run start:04`.

## Завдання 1 (просте): GET /books/stats

Додайте в `BooksService` метод `getStats()`, який повертає об'єкт
`{ total: number, oldestYear: number, newestYear: number }` - кількість
книжок, рік найстарішої і рік найновішої. Додайте в `BooksController`
маршрут `GET /books/stats`, який викликає цей метод.

<details>
<summary>Підказка</summary>

Не забудьте: `@Get('stats')` має бути оголошений ВИЩЕ `@Get(':id')`
у класі контролера - інакше трапиться та сама проблема порядку
маршрутів, що й у вправах теми 03.

</details>

## Завдання 2 (середнє): окремий сервіс для статистики

Створіть новий файл `books-stats.service.ts` з класом `BooksStatsService`
(`@Injectable()`), який має метод `average(years: number[]): number`
(середній рік видання, округлений). Змініть `BooksService`, щоб він
отримував `BooksStatsService` через конструктор (ще один параметр,
як `BooksRepository` у `di-from-scratch`) і використовував його метод
`average(...)` у `getStats()` для нового поля `averageYear`.

<details>
<summary>Підказка</summary>

Найчастіша помилка тут: додати новий сервіс у конструктор
`BooksService`, але **забути додати `BooksStatsService` у масив
`providers` в `app.module.ts`**. Якщо забути - застосунок не
запуститься з помилкою `Nest can't resolve dependencies of the
BooksService (?). Please make sure that the argument BooksStatsService
at index [1] is available in the AppModule context.` Саме так і
виглядає ця помилка насправді - запам'ятайте формулювання.

</details>

## Завдання 3 (складніше): виділити BooksRepository

Повторіть структуру з `di-from-scratch`: винесіть масив `books` і
прямі операції з ним (`find`, `push`, `filter`, `map`) із `BooksService`
в окремий клас `BooksRepository` (`@Injectable()`, свій файл
`books.repository.ts`). `BooksService` тоді залежить від
`BooksRepository` (ще один параметр конструктора) і більше не тримає
масив `books` сам - лише викликає методи репозиторію й лишає собі
бізнес-правила (перевірку `id`, кидання `NotFoundException` тощо).

<details>
<summary>Підказка</summary>

Який метод куди переїжджає - орієнтуйтесь на правило: "просто дістати/
записати дані" (без жодних HTTP-винятків) - у `BooksRepository`;
"перевірити й кинути помилку, якщо щось не так" - лишається в
`BooksService`. Не забудьте зареєструвати `BooksRepository` в
`providers` модуля.

</details>
