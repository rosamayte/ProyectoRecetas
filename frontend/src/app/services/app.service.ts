import { Injectable } from '@angular/core';
import { observable, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private tokenBs = new BehaviorSubject(null)
  public tokenObs = this.tokenBs.asObservable()

  constructor() {
  }

  // public checkUser = () => {
  //   if (this.userid) return this.userid;
  //   return null;
  // }

  public logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    this.tokenBs.next(null)
  }

  public login = (token, keepSession = false) => {
    sessionStorage.setItem('token', token)
    if (keepSession) localStorage.setItem('userid', token)
    this.tokenBs.next(token)
  }

}
