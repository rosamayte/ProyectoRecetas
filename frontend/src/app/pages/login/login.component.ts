import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private appService: AppService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    // this.appService.tokenObs.subscribe(t =>{
    //   console.log(t);
    //   if(!t) return;
    //   this.userService.getProfile().subscribe((data2: any) => {
    //     this.appService.updateUser(data2.body)
    //     // Swal.fire('Welcome', '', 'success')
    //     this.router.navigate(['/']);
    //   }, error => {
    //     this.appService.updateUser(null)
    //     // Swal.fire('Login Error', '', 'error')
    //     Swal.fire('Session expired', 'Login again', 'error')
    //   })
    // }/*, error => {
    //   this.appService.updateUser(null)
    //   Swal.fire('Session expired', 'Login again', 'error')
    // }*/)

    this.loginForm = this.formBuilder.group({
      name: new FormControl(''),
      password: new FormControl(''),
      keepSession: new FormControl(false),
    })
  }

  login() {
    // TODO: conectar con restapi conseguir jwt
    this.userService.tryLogin(this.loginForm.value).subscribe(data => {
      this.appService.login(data.body.access_token, this.loginForm.value.keepSession);
      this.userService.getProfile().subscribe((data2: any) => {
        this.appService.updateUser(data2.body)
        Swal.fire('Welcome', '', 'success')
        this.router.navigate(['/']);
      }, error => {
        this.appService.updateUser(null)
        Swal.fire('Login Error', '', 'error')
      })
    }, error => {
      Swal.fire('Login Error', '', 'error')
    })
    console.log(this.loginForm.value);
  }

  register() {
    this.router.navigate(['register']);
  }
}
