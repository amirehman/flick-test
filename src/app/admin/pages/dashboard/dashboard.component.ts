import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  message = '';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('https://phplaravel-718120-2386003.cloudwaysapps.com/api/v1/me')
    .subscribe( (res: any) => {
      this.message = `Hi ${res.name}`
    })
  }

}
