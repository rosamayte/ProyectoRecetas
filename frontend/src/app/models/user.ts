export interface IUser {
  name: string;
  recipes: Array<string>;
  ranking: number;
  info: string;
  password: string;
  _id?: string;
}
