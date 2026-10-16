/**
 * server.js
 *
 * Це "типовий" Express-застосунок для невеличкого API бібліотеки.
 * Свідомо написаний так, як часто виглядають реальні проєкти, що почались
 * як маленький прототип і виросли без рефакторингу: все в одному файлі.
 *
 * Мета цього файлу НЕ показати "як правильно", а показати, з якими
 * проблемами зіткнеться команда, коли цей файл виросте з 80 рядків до 2000.
 * Нижче в коментарях позначено конкретні проблеми під тегом [ПРОБЛЕМА].
 *
 * Пов'язані файли: немає, увесь застосунок - цей один файл.
 */

const express = require('express');

const app = express();
const PORT = 3000;

// [ПРОБЛЕМА] "База даних" - це просто масив у пам'яті, оголошений поряд
// з роутами. У реальному проєкті це може бути підключення до Mongo/Postgres,
// але спосіб роботи з ним тут не зміниться: воно буде доступне звідусіль
// як глобальна змінна, і будь-яка функція в файлі може її мутувати.
let books = [
  { id: 1, title: 'Кобзар', author: 'Тарас Шевченко', year: 1840 },
  { id: 2, title: 'Тигролови', author: 'Іван Багряний', year: 1944 },
  { id: 3, title: 'Місто', author: 'Валер\'ян Підмогильний', year: 1928 },
];
let nextId = 4;

// Express потребує явного express.json(), щоб розпарсити JSON-тіло запиту.
app.use(express.json());

// --- GET /books - список усіх книжок ---------------------------------
app.get('/books', (req, res) => {
  // [ПРОБЛЕМА] Жодної валідації query-параметрів, жодної пагінації.
  // Якщо завтра знадобиться фільтр "?author=...", цей рядок доведеться
  // переписувати тут же, посеред файлу, що росте.
  res.json(books);
});

// --- GET /books/:id - одна книжка -------------------------------------
app.get('/books/:id', (req, res) => {
  // [ПРОБЛЕМА] Перетворення рядка на число і перевірка на NaN
  // повторюються в КОЖНОМУ роуті, де є :id. Скопійовано-вставлено.
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'id має бути числом' });
  }

  const book = books.find((b) => b.id === id);
  if (!book) {
    // [ПРОБЛЕМА] Формат помилки { message: ... } придуманий "на ходу".
    // Ніхто не гарантує, що в іншому роуті помилка буде мати такий же вигляд.
    return res.status(404).json({ message: `Книжку з id=${id} не знайдено` });
  }

  res.json(book);
});

// --- POST /books - створити книжку ------------------------------------
app.post('/books', (req, res) => {
  const { title, author, year } = req.body ?? {};

  // [ПРОБЛЕМА] Валідація вручну, рядок за рядком. У великому застосунку
  // таких перевірок будуть сотні, і вони будуть виглядати по-різному
  // в кожному роуті, бо писали різні люди в різний час.
  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ message: 'title є обов\'язковим рядком' });
  }
  if (typeof author !== 'string' || author.trim() === '') {
    return res.status(400).json({ message: 'author є обов\'язковим рядком' });
  }
  if (typeof year !== 'number' || !Number.isInteger(year)) {
    return res.status(400).json({ message: 'year є обов\'язковим цілим числом' });
  }

  const book = { id: nextId, title, author, year };
  nextId += 1;
  books.push(book);

  res.status(201).json(book);
});

// --- PUT /books/:id - оновити книжку -----------------------------------
app.put('/books/:id', (req, res) => {
  // [ПРОБЛЕМА] Та сама перевірка id, що й у GET /books/:id. Копія.
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'id має бути числом' });
  }

  const index = books.findIndex((b) => b.id === id);
  if (index === -1) {
    return res.status(404).json({ message: `Книжку з id=${id} не знайдено` });
  }

  const { title, author, year } = req.body ?? {};

  // [ПРОБЛЕМА] І знову та сама валідація title/author/year, яку ми вже
  // писали в POST /books. Скопійовано ще раз.
  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ message: 'title є обов\'язковим рядком' });
  }
  if (typeof author !== 'string' || author.trim() === '') {
    return res.status(400).json({ message: 'author є обов\'язковим рядком' });
  }
  if (typeof year !== 'number' || !Number.isInteger(year)) {
    return res.status(400).json({ message: 'year є обов\'язковим цілим числом' });
  }

  books[index] = { id, title, author, year };
  res.json(books[index]);
});

// --- DELETE /books/:id - видалити книжку -------------------------------
app.delete('/books/:id', (req, res) => {
  // [ПРОБЛЕМА] Третя копія перевірки id в цьому файлі.
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'id має бути числом' });
  }

  const index = books.findIndex((b) => b.id === id);
  if (index === -1) {
    return res.status(404).json({ message: `Книжку з id=${id} не знайдено` });
  }

  books.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`[00-express-app] слухає порт ${PORT}`);
});

/**
 * Підсумуємо проблеми, які накопичились навіть у цьому крихітному файлі:
 *
 * 1. Перевірка "id - число" скопійована 3 рази.
 * 2. Валідація title/author/year скопійована 2 рази.
 * 3. "База даних" (масив books) - глобальна змінна, доступна з будь-якого
 *    місця файлу; немає чіткого шару, що відповідає тільки за дані.
 * 4. HTTP-логіка (статус-коди, req/res) і бізнес-логіка (що означає
 *    "створити книжку") змішані в одній функції.
 * 5. Немає жодної структури, яку можна було б винести в окремий модуль
 *    і повторно використати (наприклад, в тестах) без піднімання
 *    цілого Express-застосунку.
 * 6. Коли файл виросте до 20 ресурсів (не тільки books), він стане
 *    тисячами рядків без жодної очевидної межі між ними.
 *
 * Саме ці проблеми Nest вирішує за допомогою структури "з коробки":
 * контролери, сервіси, модулі, Dependency Injection. Побачимо це
 * у наступних темах.
 */
