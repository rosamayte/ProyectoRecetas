export interface IUser {
  name: string;
  email: string;
  recipes: Array<string>;
  ranking: number;
  image: string;
  info: string;
  networks: Array<string>;
  password?: string;
  _id?: string;
}