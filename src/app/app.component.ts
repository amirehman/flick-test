import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenStorageService } from './shared/token.service';
import { EventBusService } from './shared/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  eventBusSub?: Subscription;

  constructor(private tokenStorageService: TokenStorageService, private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.me.name;
    }
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  logout(): void {
    this.tokenStorageService.logout();
    this.isLoggedIn = false;
  }

}
