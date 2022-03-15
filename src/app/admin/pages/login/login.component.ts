import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';
import { TokenStorageService  } from '../../../shared/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private tokenStorage: TokenStorageService,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  form: any = {
    email: '',
    password: ''
  };

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['dashboard']);
    }
  }


  loginUser(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      res => {
        this.tokenStorage.saveToken(res.data.access_token);
        this.tokenStorage.saveRefreshToken(res.data.refresh_token);
        this.tokenStorage.saveUser(res.data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        window.location.reload();

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }


}
