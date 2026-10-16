/**
 * create-author.dto.ts
 * Форма тіла запиту для POST /authors, без валідації.
 */
export class CreateAuthorDto {
  name: string;
  country: string;
}
