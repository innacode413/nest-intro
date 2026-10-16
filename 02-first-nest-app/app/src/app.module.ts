/**
 * app.module.ts
 *
 * Кореневий модуль застосунку. Модуль - це "коробка", яка групує
 * пов'язані controllers і providers. Детальніше про модулі - у темі
 * 05-modules; тут достатньо знати, що застосунок Nest завжди починається
 * з одного кореневого модуля. Пов'язані файли: app.controller.ts,
 * app.service.ts (обидва зареєстровані тут), main.ts (звідки цей модуль
 * завантажується).
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  // imports: інші модулі, чию функціональність хоче використати цей модуль
  imports: [],
  // controllers: класи, що обробляють HTTP-запити (детально - тема 03)
  controllers: [AppController],
  // providers: класи з бізнес-логікою, які Nest може підставляти
  // через Dependency Injection (детально - тема 04)
  providers: [AppService],
})
export class AppModule {}
