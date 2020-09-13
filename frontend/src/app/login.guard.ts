import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from './services/app.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  private user = null;

  constructor(
    private router: Router,
    private appService: AppService
  ) { 
    this.appService.userObs.subscribe(u=>{
      this.user = u;
    }, error =>{
      this.user = null;
    })
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log(localStorage.getItem('userid'))
    if (this.user != null) {
      this.router.navigate(['/']);
    } else return true
  }

}
