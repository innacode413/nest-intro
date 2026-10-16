/**
 * main.ts
 * Точка входу. Пов'язаний файл: app.module.ts.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3003;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(`Застосунок слухає http://localhost:${PORT}`);
}

bootstrap();
