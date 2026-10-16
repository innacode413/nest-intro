/**
 * app.controller.ts
 *
 * Контролер - клас, що приймає HTTP-запити (детальніше - тема
 * 03-controllers). Тут лишаємо лише один найпростіший маршрут,
 * щоб переконатись, що застосунок узагалі піднявся. Пов'язані файли:
 * app.module.ts (реєструє цей контролер), app.service.ts (сюди
 * інжектується).
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller() без аргументу = маршрути цього контролера починаються
// прямо з кореня ("/"), без префікса.
@Controller()
export class AppController {
  // Nest сам створює AppService і підставляє його сюди - це
  // Dependency Injection, детально - у темі 04-services-and-di.
  constructor(private readonly appService: AppService) {}

  // @Get() без аргументу = обробляє GET-запити на "/"
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
