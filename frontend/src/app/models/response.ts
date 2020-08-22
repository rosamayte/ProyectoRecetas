export interface IResponse<T = any> {
  statusCode: number,
  ok: boolean,
  body: T
}