import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
       user: new FormControl(''),
       password: new FormControl(''),
       keepSession: new FormControl(false),
    })
  }

  login() {
    // TODO: conectar con restapi conseguir jwt
    this.appService.login('qwe123');
    this.router.navigate(['/']);
    console.log(this.loginForm.value);
  }

  register() {
    this.router.navigate(['register']);
  }
}
