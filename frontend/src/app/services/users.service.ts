import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private headers;

  constructor(
    private httpClient: HttpClient
  ) {
    this.headers = { headers: { 'Content-Type': 'application/json' } };
  }

  public getUsers = () => {
    return this.httpClient.get(`${environment.users_url}`).pipe(map(data => data));
  }

  public create(body: IUser): Observable<any> {
    return this.httpClient.post(`${environment.users_url}`, body).pipe(map(data => data))
  }

  public getUser(id: string): Observable<any>{
    return this.httpClient.get(`${environment.users_url}${id}`).pipe(map(data => data))
  }
}
