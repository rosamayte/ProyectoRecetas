import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public login;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.appService.userid.subscribe((id) => {
      this.login = id;
    })
  }
  logout() {
    this.appService.logout()
  }
}
