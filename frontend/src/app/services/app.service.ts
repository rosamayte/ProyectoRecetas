import { Injectable } from '@angular/core';
import { observable, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _id = new BehaviorSubject(null)
  public userid = this._id.asObservable()

  constructor() { }

  public checkUser = ()=> {
    const userid = localStorage.getItem("userid");
    if(userid) return userid;
    return null;
  }

  public logout = () => {
    localStorage.clear();
    this._id.next(null)
  }

  public login = (uid) => {
    localStorage.setItem('userid', uid)
    this._id.next(uid)
  }

}
