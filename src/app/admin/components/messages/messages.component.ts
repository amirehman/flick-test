import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenStorageService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  isLoggedIn = false
  name? = ''
  hideMessage? = 'false'

  constructor(
    public authService: AuthService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {


    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.hideMessage = JSON.stringify(localStorage.getItem("WELCOME_MESSAGE")).replace(/['"]+/g, '');


    if (this.isLoggedIn) {
      let user = this.tokenStorageService.getUser();
      this.name = user.me.name
    }

  }

  closeMessage () {
    window.localStorage.setItem('WELCOME_MESSAGE', JSON.stringify(true));
    this.hideMessage = JSON.stringify(localStorage.getItem("WELCOME_MESSAGE")).replace(/['"]+/g, '');
  }


}
