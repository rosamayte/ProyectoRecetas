import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user = null;

  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.appService.userObs.subscribe((u) => {
      console.log(u)
      this.user = u;
    }, error =>{
      this.user = null;
    })
  }
  logout() {
    this.appService.logout()
    this.router.navigate(['/login'])
  }
}

