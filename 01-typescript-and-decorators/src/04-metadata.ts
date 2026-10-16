/**
 * 04-metadata.ts
 *
 * Як декоратор може "запам'ятати" інформацію про клас так, щоб хтось
 * інший (наприклад, DI-контейнер) міг її пізніше прочитати.
 * Відповідь: reflect-metadata + decorator metadata TypeScript.
 * Запуск: npm run demo:01:4
 *
 * Це найважливіший файл теми - саме цей механізм лежить в основі
 * Dependency Injection у Nest. Пов'язані файли:
 * 04-services-and-di/di-from-scratch/index.ts (той самий механізм,
 * але вже як робочий міні-контейнер).
 */

// reflect-metadata - бібліотека-полліфіл, яка додає Reflect.defineMetadata
// і Reflect.getMetadata. Імпортуємо її заради побічного ефекту (side effect):
// сам імпорт нічого не експортує, але "вмикає" ці методи на об'єкті Reflect.
import 'reflect-metadata';

// --- Крок 1: власний простий приклад metadata ----------------------------
// Reflect.defineMetadata(ключ, значення, ціль) записує довільні дані,
// "прикріплені" до класу (чи його методу/властивості).
const ROLE_KEY = 'app:role';

function Role(role: string) {
  // Це decorator factory: функція, що повертає декоратор. Так влаштовані
  // майже всі декоратори Nest - @Controller('books') теж фабрика.
  return function (target: Function) {
    Reflect.defineMetadata(ROLE_KEY, role, target);
  };
}

@Role('catalog-service')
class CatalogService {}

const role = Reflect.getMetadata(ROLE_KEY, CatalogService);
console.log('--- 04-metadata.ts ---');
console.log('Роль CatalogService:', role);

// --- Крок 2: типи параметрів конструктора "з коробки" --------------------
// Коли в tsconfig.json увімкнено "emitDecoratorMetadata": true, TypeScript
// сам (без нашого коду) записує для КОЖНОГО класу з хоча б одним
// декоратором спеціальні метадані design:paramtypes - масив типів
// параметрів конструктора. Для цього достатньо, щоб клас мав
// БУДЬ-ЯКИЙ декоратор (нижче - порожній декоратор-маркер).
function Injectable() {
  return function (_target: Function) {
    // нічого не робимо - сам факт наявності декоратора змушує
    // TypeScript згенерувати design:paramtypes для цього класу
  };
}

class BooksRepository {}

@Injectable()
class BooksService {
  constructor(private readonly repo: BooksRepository) {}
}

// Читаємо типи параметрів конструктора BooksService - TypeScript сам
// поклав їх туди під час компіляції, ми нічого для цього не писали.
const paramTypes = Reflect.getMetadata('design:paramtypes', BooksService);
console.log(
  'Типи параметрів конструктора BooksService:',
  paramTypes?.map((t: Function) => t.name),
);

// Саме це читає Nest, коли бачить BooksService у providers якогось модуля:
// "конструктору потрібен один параметр типу BooksRepository -> створю
// (або візьму вже створений) BooksRepository і підставлю його сюди".
// Жодної магії - просто Reflect.getMetadata('design:paramtypes', ...).
//
// У наступній темі (04-services-and-di/di-from-scratch) ми напишемо
// міні-контейнер, який робить це по-справжньому, у ~30 рядків коду.
