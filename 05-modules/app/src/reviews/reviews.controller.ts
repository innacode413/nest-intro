/**
 * reviews.controller.ts
 * HTTP-шар рецензій - тонкий контролер, вся логіка в ReviewsService.
 * Пов'язаний файл: reviews.module.ts.
 */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { Review } from './review.interface';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // @Query('bookId') дістає значення з query-рядка, напр. /reviews?bookId=1
  @Get()
  findAll(@Query('bookId') bookId?: string): Review[] {
    return this.reviewsService.findAll(
      bookId !== undefined ? this.reviewsService.parseBookId(bookId) : undefined,
    );
  }

  @Post()
  create(@Body() dto: CreateReviewDto): Review {
    return this.reviewsService.create(dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.reviewsService.remove(this.reviewsService.parseId(id));
  }
}
