import { Injectable } from '@angular/core';
import { observable, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private tokenBs = new BehaviorSubject(null);
  public tokenObs = this.tokenBs.asObservable();
  private userBs = new BehaviorSubject(null);
  public userObs = this.userBs.asObservable();

  constructor() {
    let token = sessionStorage.getItem('token');
    if(token) this.login(token)
    else {
      token = localStorage.getItem('token');
      if(token) this.login(token, true)
    }
  }

  // public checkUser = () => {
  //   if (this.userid) return this.userid;
  //   return null;
  // }

  public logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    this.tokenBs.next(null);
    this.userBs.next(null);
  }

  public login = (token, keepSession = false) => {
    if (keepSession) localStorage.setItem('token', token)
    else sessionStorage.setItem('token', token)
    this.tokenBs.next(token)
  }

  public updateUser = (user) => {
    this.userBs.next(user)
  }

}
