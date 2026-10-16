# Шпаргалка

## CLI-команди

```bash
npm i -g @nestjs/cli         # встановити CLI глобально (або npx @nestjs/cli@latest)
nest new <ім'я>              # створити новий застосунок
nest g module <ім'я>         # згенерувати модуль (скорочено: nest g mo)
nest g controller <ім'я>     # згенерувати контролер (nest g co)
nest g service <ім'я>        # згенерувати сервіс (nest g s)
nest g resource <ім'я>       # згенерувати модуль+контролер+сервіс+DTO одразу (nest g res)
nest build                   # зібрати застосунок (tsc) у dist/
nest start                   # запустити зібраний застосунок
nest start --watch           # запустити з автоперезапуском при зміні файлів
```

## Основні декоратори

| Декоратор | Де застосовується | Що робить |
|---|---|---|
| `@Module({...})` | клас модуля | Групує controllers/providers, оголошує imports/exports |
| `@Controller('prefix')` | клас контролера | Позначає клас як обробник HTTP-запитів з префіксом шляху |
| `@Injectable()` | клас сервіса | Позначає клас як провайдер, готовий до Dependency Injection |
| `@Get(path?)` | метод контролера | Обробляє GET-запит |
| `@Post(path?)` | метод контролера | Обробляє POST-запит |
| `@Put(path?)` | метод контролера | Обробляє PUT-запит |
| `@Delete(path?)` | метод контролера | Обробляє DELETE-запит |
| `@Patch(path?)` | метод контролера | Обробляє PATCH-запит |
| `@Param('name')` | параметр методу | Читає сегмент URL (`:name`) |
| `@Query('name')` | параметр методу | Читає query-параметр (`?name=...`) |
| `@Body()` | параметр методу | Читає й розпарсює тіло запиту (мапить на DTO-клас) |
| `@HttpCode(код)` | метод контролера | Перемикає статус-код відповіді за замовчуванням |
| `@Inject(token)` | параметр конструктора | Явно вказує, що саме інжектувати (потрібно для `forwardRef`) |

## Вбудовані HTTP-винятки (кидають готову відповідь)

```ts
throw new BadRequestException('повідомлення');   // 400
throw new NotFoundException('повідомлення');     // 404
throw new ForbiddenException('повідомлення');    // 403
throw new ConflictException('повідомлення');     // 409
```

## Скелет модуля

```ts
import { Module } from '@nestjs/common';
import { SomethingController } from './something.controller';
import { SomethingService } from './something.service';

@Module({
  imports: [],                        // інші модулі, чиї провайдери потрібні тут
  controllers: [SomethingController], // контролери цього модуля
  providers: [SomethingService],      // сервіси, створені в цьому модулі
  exports: [SomethingService],        // що з providers видно модулям, які імпортують цей
})
export class SomethingModule {}
```

## Скелет сервісу

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SomethingService {
  constructor(private readonly otherService: OtherService) {}

  doSomething(): string {
    return 'результат';
  }
}
```

## Скелет контролера

```ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SomethingService } from './something.service';
import { CreateSomethingDto } from './dto/create-something.dto';

@Controller('something')
export class SomethingController {
  constructor(private readonly service: SomethingService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateSomethingDto) {
    return this.service.create(dto);
  }
}
```

## Циклічна залежність (коротко)

```ts
// у модулі A
imports: [forwardRef(() => ModuleB)]

// у сервісі A
constructor(
  @Inject(forwardRef(() => ServiceB))
  private readonly serviceB: ServiceB,
) {}
```

Детальніше: [docs.nestjs.com/fundamentals/circular-dependency](https://docs.nestjs.com/fundamentals/circular-dependency)
