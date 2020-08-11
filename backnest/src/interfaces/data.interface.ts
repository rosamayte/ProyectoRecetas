export interface Data<T> {
  statusCode: number;
  ok:boolean;
  body: T;
}
