import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './services/app.service';
import { UsersService } from './services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private appService: AppService,
    private userService: UsersService,
    private router: Router
  ) {
    this.appService.tokenObs.subscribe(t => {
      console.log(t);
      if (!t) return;
      this.userService.getProfile().subscribe((data2: any) => {
        this.appService.updateUser(data2.body)
        this.router.navigate(['/']);
      }, error => {
        this.appService.updateUser(null)
        Swal.fire('Session expired', 'Login again', 'error')
      })
    })
  }
}
