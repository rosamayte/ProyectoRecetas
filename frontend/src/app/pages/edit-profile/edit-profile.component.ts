import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { confirmPasswordValidator } from '../register-user/register-user.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public user = null;
  public net: Array<string> = [''];
  public nullarray: Array<null> = [null];
  public info: string = "";
  public password = "";
  public cpassword = "";

  constructor(
    private userService: UsersService,
    private appService: AppService,
  ) { }

  ngOnInit(): void {
    this.appService.userObs.subscribe(u => {
      this.user = u;
      this.net = u?u.networks:[''];
      this.nullarray = new Array(u.networks.length).fill(null)
      this.info = u.info;
    }, error => {
      this.user = null;
    })
  }

  public addRow() {
    this.net.push("");
    this.nullarray.push(null);
  }

  public removeRow() {
    this.net.pop();
    this.nullarray.pop();
  }

  public updateProfile() {
    this.user.networks = this.net;
    this.user.info = this.info;
    if (this.password === this.cpassword && this.password.length > 0) this.user.password = this.password;
    this.userService.updateProfile(this.user).subscribe(data => {
      Swal.fire('Updated', '', 'success')
    }, error => {
      console.log(error);
      Swal.fire('Error', '', 'error')
    })
  }
}