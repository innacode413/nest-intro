/**
 * server.js
 *
 * Ті самі ендпоінти /books, що й у ../nest-version/src/books/books.controller.ts,
 * з однаковою поведінкою і однаковими статус-кодами - щоб відкрити
 * обидва файли поруч і порівняти @Get/@Post/@Param/@Body/@Query
 * з app.get()/app.post()/req.params/req.body/req.query.
 */

const express = require('express');

const app = express();
const PORT = 3103;

app.use(express.json());

let books = [
  { id: 1, title: 'Кобзар', author: 'Тарас Шевченко', year: 1840 },
  { id: 2, title: 'Тигролови', author: 'Іван Багряний', year: 1944 },
  { id: 3, title: 'Місто', author: 'Валер\'ян Підмогильний', year: 1928 },
];
let nextId = 4;

function parseId(id) {
  const parsed = Number(id);
  return Number.isNaN(parsed) ? null : parsed;
}

// GET /books - еквівалент @Get() findAll(@Query('author') author?: string)
app.get('/books', (req, res) => {
  const { author } = req.query;
  if (!author) {
    return res.json(books);
  }
  const filtered = books.filter((b) =>
    b.author.toLowerCase().includes(String(author).toLowerCase()),
  );
  res.json(filtered);
});

// GET /books/:id - еквівалент @Get(':id') findOne(@Param('id') id: string)
app.get('/books/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ statusCode: 400, message: 'id має бути числом' });
  }
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res
      .status(404)
      .json({ statusCode: 404, message: `Книжку з id=${id} не знайдено` });
  }
  res.json(book);
});

// POST /books - еквівалент @Post() create(@Body() dto: CreateBookDto)
app.post('/books', (req, res) => {
  const { title, author, year } = req.body ?? {};
  const book = { id: nextId, title, author, year };
  nextId += 1;
  books.push(book);
  res.status(201).json(book);
});

// PUT /books/:id - еквівалент @Put(':id') update(...)
app.put('/books/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ statusCode: 400, message: 'id має бути числом' });
  }
  const exists = books.some((b) => b.id === id);
  if (!exists) {
    return res
      .status(404)
      .json({ statusCode: 404, message: `Книжку з id=${id} не знайдено` });
  }
  const { title, author, year } = req.body ?? {};
  const updated = { id, title, author, year };
  books = books.map((b) => (b.id === id ? updated : b));
  res.json(updated);
});

// DELETE /books/:id - еквівалент @Delete(':id') @HttpCode(204) remove(...)
app.delete('/books/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ statusCode: 400, message: 'id має бути числом' });
  }
  const exists = books.some((b) => b.id === id);
  if (!exists) {
    return res
      .status(404)
      .json({ statusCode: 404, message: `Книжку з id=${id} не знайдено` });
  }
  books = books.filter((b) => b.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`[03-express-version] слухає порт ${PORT}`);
});
