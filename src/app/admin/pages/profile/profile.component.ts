import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from 'src/app/shared/token.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  isLoggedIn = false;
  token? = '';

  data?= null;
  email?= null;
  errorMessage?= null;

  userForm = new FormGroup({
    name: new FormControl(),
    phone: new FormControl(),
    address: new FormControl(),
  })

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.userForm.patchValue({
        name: user.me.name,
        phone: user.me.phone,
      });
      this.email = user.me.email
    }else{
      this.router.navigate(['login']);
    }

    this.getUser()

  }

  updateUser(): void {

    this.authService.updateUser(this.userForm.value.name, this.userForm.value.phone).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
        this.errorMessage = err.error.message;
      }
    );

  }

  getUser(): void {

    this.authService.getUser().subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
        this.errorMessage = err.error.message;
      }
    );

  }

}
