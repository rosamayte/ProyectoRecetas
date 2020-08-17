export class CreateRecipeDto {
  name: string;
  description: string;
  ingredients: Array<{ quantity: number, name: string }>;
  steps: string;
  picture: string;
  votes: number;
  owner: string;
  date: Date;
}
