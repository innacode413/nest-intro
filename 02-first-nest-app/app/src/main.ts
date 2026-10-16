/**
 * main.ts
 *
 * Точка входу застосунку. Саме цей файл запускає Node, коли ми пишемо
 * `node dist/main.js` (або `nest start`). Пов'язаний файл: app.module.ts
 * (кореневий модуль, який тут завантажується).
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3002;

async function bootstrap() {
  // NestFactory.create будує весь застосунок: читає AppModule, усі його
  // controllers/providers/imports, і піднімає HTTP-сервер (за замовчуванням
  // на основі Express - саме того Express, який ми бачили в темі 00).
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT);
  console.log(`Застосунок слухає http://localhost:${PORT}`);
}

bootstrap();
