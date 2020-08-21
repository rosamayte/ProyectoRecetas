import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormBuilder, FormControl, ValidatorFn, ValidationErrors, AbstractControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  public registerForm: FormGroup;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private userService: UsersService,
    private appService: AppService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      cpassword: new FormControl('', [confirmPasswordValidator, Validators.required]),
      info: new FormControl('', Validators.required),
    })
    this.registerForm.get('password').valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.registerForm.get('cpassword').updateValueAndValidity();
      });
  }

  public get name() {
    return this.registerForm.get('name')
  }

  public get password() {
    return this.registerForm.get('password')
  }

  public get cpassword() {
    return this.registerForm.get('cpassword')
  }

  public get info() {
    return this.registerForm.get('info')
  }

  register() {
    console.log(this.registerForm.value)
  }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn =
  (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
      return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
      return null;
    }

    if (passwordConfirm.value === '') {
      return null;
    }

    if (password.value === passwordConfirm.value) {
      return null;
    }

    return { passwordsNotMatching: true };
  };
