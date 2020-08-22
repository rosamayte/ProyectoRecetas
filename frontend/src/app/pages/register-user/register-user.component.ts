import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormBuilder, FormControl, ValidatorFn, ValidationErrors, AbstractControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { IResponse } from '../../models/response';
import Swal from 'sweetalert2';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  public registerForm: FormGroup;
  // private _unsubscribeAll: Subject<any>;

  constructor(
    private userService: UsersService,
    private appService: AppService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    // this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      cpassword: new FormControl('', [Validators.required]),
      info: new FormControl(null),
    }, { validator: confirmPasswordValidator })
    // this.registerForm.get('password').valueChanges
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(() => {
    //     this.registerForm.get('cpassword').updateValueAndValidity();
    //   });
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
    this.userService.create(this.registerForm.value).subscribe((response: IResponse) => {
      console.log(response)
      if (response.statusCode === 200) {
        Swal.fire({
          title: 'Registered!',
          text: 'Your accout was successfully created',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      } else {
        Swal.fire({
          title: 'Registration error',
          text: response.body,
          icon: 'warning',
        })
      }
    }, error => {
      console.log(error)
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error'
      })
    });
  }
}

export const confirmPasswordValidator = (control: FormGroup) => {
  const password = control.get('password');
  const cpassword = control.get('cpassword');
  if (password.value !== cpassword.value) {
    cpassword.setErrors({ noMatch: true })
  }
};

// /**
//  * Confirm password validator
//  *
//  * @param {AbstractControl} control
//  * @returns {ValidationErrors | null}
//  */
// export const confirmPasswordValidator: ValidatorFn =
//   (control: AbstractControl): ValidationErrors | null => {

//     if (!control.parent || !control) {
//       return null;
//     }

//     const password = control.parent.get('password');
//     const passwordConfirm = control.parent.get('passwordConfirm');

//     if (!password || !passwordConfirm) {
//       return null;
//     }

//     if (passwordConfirm.value === '') {
//       return null;
//     }

//     if (password.value === passwordConfirm.value) {
//       return null;
//     }

//     return { passwordsNotMatching: true };
//   };

