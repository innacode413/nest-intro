/**
 * create-review.dto.ts
 * Форма тіла запиту для POST /reviews, без валідації.
 */
export class CreateReviewDto {
  bookId: number;
  text: string;
  rating: number;
}
