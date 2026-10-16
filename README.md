# NestJS Intro: «Від Express до Nest»

Навчальний проєкт для вступного (2-годинного) уроку з NestJS. Побудований
навколо одного простого API «Бібліотека» (книжки, а з теми 05 - ще й
автори), без бази даних (дані в масиві в пам'яті), щоб увага була на
самому Nest, а не на суміжних темах.

## Для кого цей проєкт

Для студентів, які:
- добре знають JavaScript;
- працювали з Express, SQL і NoSQL;
- слабко знають TypeScript;
- нічого не знають про NestJS.

І для викладача, який давно не працював з Nest і хоче матеріал,
зрозумілий одразу, без необхідності окремо гуглити кожне поняття.

## Підхід

Кожна тема - знімок **того самого** проєкту на один крок далі. Код не
переписується з нуля щоразу: контролер з теми 03 перетворюється на
контролер+сервіс у темі 04, модуль з теми 04 розділяється на два
модулі в темі 05. Це дозволяє бачити еволюцію коду, а не набір
розрізнених прикладів.

Усюди, де можливо, одна й та сама задача показана спершу на Express
(який студенти знають), а потім - на Nest, поруч.

## Що потрібно заздалегідь

- Впевнене знання JavaScript (функції, масиви, async/await).
- Базовий досвід з Express (маршрути, middleware, `req`/`res`).
- TypeScript не обов'язковий - мінімум, потрібний для цього курсу,
  дає тема [01-typescript-and-decorators](./01-typescript-and-decorators/).

## Вимоги

- **Node.js** `24.21.0` (LTS "Krypton") - версія зафіксована в [`.nvmrc`](./.nvmrc).
  Якщо використовуєте [nvm](https://github.com/nvm-sh/nvm): `nvm use`.
- **npm** `>= 10` (іде разом із Node 24).
- Редактор: VS Code рекомендовано (не обов'язково). Рекомендовані
  розширення - у [`.vscode/extensions.json`](./.vscode/extensions.json):
  - [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) - щоб виконувати запити з файлів `requests.http`;
  - Prettier - форматування коду;
  - Markdown Mermaid - перегляд діаграм у `README.md` прямо в редакторі.

## Швидкий старт

```bash
git clone <посилання-на-репозиторій>
cd nestjs-intro

nvm use           # якщо є nvm; інакше просто переконайтесь, що Node 24.x
npm install        # один install встановлює залежності ВСІХ тем (npm workspaces)

npm run start:00   # перша тема - типовий Express-застосунок
```

Відкрийте [`00-why-nest/README.md`](./00-why-nest/README.md) і рухайтесь
по темах за порядком номерів.

## Теми

| # | Назва | Що вивчаємо | Папка | Команда запуску |
|---|---|---|---|---|
| 00 | Чому Nest | Проблеми Express на масштабі, що таке Nest | [00-why-nest](./00-why-nest/) | `npm run start:00` |
| 01 | TypeScript і декоратори | Мінімум TS, декоратори, reflect-metadata | [01-typescript-and-decorators](./01-typescript-and-decorators/) | `npm run demo:01:1` … `demo:01:4` |
| 02 | Перший Nest-застосунок | `nest new`, структура проєкту, `main.ts` | [02-first-nest-app](./02-first-nest-app/) | `npm run start:02` |
| 03 | Controllers | `@Get`/`@Post`/`@Param`/`@Body`/`@Query` | [03-controllers](./03-controllers/) | `npm run start:03` / `start:03:express` |
| 04 | Services & DI | Сервіси, Dependency Injection, IoC-контейнер | [04-services-and-di](./04-services-and-di/) | `npm run start:04` / `start:04:di` |
| 05 | Modules | `imports`/`providers`/`controllers`/`exports` | [05-modules](./05-modules/) | `npm run start:05` |
| 06 | Підсумок | Мапа Express → Nest, що вивчати далі | [06-summary](./06-summary/) | - (без коду) |

Збірка всіх Nest-застосунків одразу: `npm run build:all`.

## Як працювати з проєктом самостійно

1. Проходьте теми за порядком номерів - кожна спирається на попередню.
2. У кожній темі спочатку прочитайте `README.md` (там є пояснення
   "що змінилось порівняно з попередньою темою"), потім відкрийте код.
3. Шукайте коментар `// [НОВЕ]` - він позначає код, що з'явився саме
   в цій темі порівняно з попередньою. У редакторі можна скористатись
   пошуком по всьому проєкту (VS Code: `Ctrl+Shift+F` → `[НОВЕ]`).
4. Для застосунків з HTTP - відкрийте `requests.http` цієї теми в
   VS Code з розширенням REST Client і натискайте "Send Request" над
   кожним запитом. Якщо не користуєтесь VS Code - еквівалентні
   `curl`-команди є в README кожної теми.
5. Після прочитання коду виконайте завдання з `exercises/TASKS.md`
   (де вони є), і лише потім дивіться `exercises/solutions/`.

## Корисні посилання

- [NestJS - офіційна документація](https://docs.nestjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Express - офіційна документація](https://expressjs.com/)

Що вивчати після цього уроку - дивіться
[06-summary/README.md, розділ 3.3](./06-summary/README.md#33-що-вивчати-далі).

## Інші кореневі файли

- [`TEACHER_NOTES.md`](./TEACHER_NOTES.md) - сценарій уроку для викладача.
- [`CHEATSHEET.md`](./CHEATSHEET.md) - шпаргалка: CLI, декоратори, скелет модуля.
- [`GLOSSARY.md`](./GLOSSARY.md) - глосарій термінів.
- [`HOMEWORK.md`](./HOMEWORK.md) - домашнє завдання.
