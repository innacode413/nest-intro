/**
 * review.interface.ts
 * Форма однієї рецензії. Пов'язаний файл: reviews.service.ts.
 */
export interface Review {
  id: number;
  bookId: number;
  text: string;
  rating: number;
}
