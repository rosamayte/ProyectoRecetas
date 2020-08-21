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

  private headers

  constructor(
    private httpClient: HttpClient
  ) {
    this.headers = { headers: { 'Content-Type': 'application/json' } };
  }

  public create(body: IUser): Observable<any> {
    return this.httpClient.post(`${environment.users_url}`, body).pipe(map(data => data))
  }
}
