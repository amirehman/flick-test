import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventBusService } from 'src/app/shared/event-bus.service';
import { TokenStorageService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-profile-action',
  templateUrl: './profile-action.component.html',
  styleUrls: ['./profile-action.component.css']
})
export class ProfileActionComponent implements OnInit {

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.tokenStorageService.logout();
    this.isLoggedIn = false;
  }

}
