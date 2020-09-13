import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators'
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private headers;
  private token = null;

  constructor(
    private httpClient: HttpClient,
    private appService: AppService
  ) {
    this.headers = { headers: { 'Content-Type': 'application/json' } };
    this.appService.tokenObs.subscribe(T => {
      this.token = T
    }, error => {
      this.token = null
    })
  }

  public getUsers = () => {
    return this.httpClient.get(`${environment.users_url}`).pipe(map(data => data));
  }

  public create(body: IUser): Observable<any> {
    return this.httpClient.post(`${environment.users_url}`, body).pipe(map(data => data))
  }

  public getUser(id: string): Observable<any> {
    return this.httpClient.get(`${environment.users_url}${id}`).pipe(map(data => data))
  }

  public tryLogin(body): Observable<any> {
    return this.httpClient.post(`${environment.auth_url}login`, body).pipe(map(data => data))
  }

  public getProfile(){
    return this.httpClient.get(`${environment.auth_url}profile`, { headers: { Authorization: `Bearer ${this.token}`}}).pipe(map(data => data))
  }
}
