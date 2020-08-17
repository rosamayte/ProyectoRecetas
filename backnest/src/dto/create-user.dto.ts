export class CreateUserDto {
  name: string;
  recipes: Array<string>;
  ranking: number;
  info: string;
  password: string;
}