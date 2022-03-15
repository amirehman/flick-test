import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../shared/auth.service';
import { TokenStorageService } from './token.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router,
    private tokenStorage: TokenStorageService,

  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['login']);
    }
    return true;
  }
}
