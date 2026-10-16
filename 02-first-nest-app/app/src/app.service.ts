/**
 * app.service.ts
 *
 * Сервіс - клас з бізнес-логікою, без жодного уявлення про HTTP
 * (детальніше - тема 04-services-and-di). Пов'язаний файл:
 * app.controller.ts (інжектує цей сервіс через конструктор).
 */
import { Injectable } from '@nestjs/common';

// @Injectable() позначає клас як "провайдер" - клас, екземпляром якого
// Nest може керувати і підставляти в інші класи через DI.
@Injectable()
export class AppService {
  getHello(): string {
    return 'Привіт від бібліотеки на Nest!';
  }
}
