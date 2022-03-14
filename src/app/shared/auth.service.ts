import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://phplaravel-718120-2386003.cloudwaysapps.com/api/v1'

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'App-Secret': '*(3%13@Uh@1',
    'Platform': 'web'
     })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${AUTH_API}/auth/admin-login`, { email, password }, httpOptions);
  }
  
  refreshToken(token: string) {
    return this.http.post(`${AUTH_API}/auth/refresh?access_token=${token}`, httpOptions);
  }

  
}