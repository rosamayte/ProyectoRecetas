import { Injectable } from '@angular/core';
import { observable, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _id = new BehaviorSubject(null)
  public userid = this._id.asObservable()

  constructor() {
    const userid = sessionStorage.getItem('userid') || localStorage.getItem('userid');
    this.login(userid)
  }

  // public checkUser = () => {
  //   if (this.userid) return this.userid;
  //   return null;
  // }

  public logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    this._id.next(null)
  }

  public login = (uid, keepSession = false) => {
    sessionStorage.setItem('userid', uid)
    if(keepSession) localStorage.setItem('userid', uid)
    this._id.next(uid)
  }

}
