import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.css'],
})
export class ScorecardComponent implements OnInit {
  parsedData: any;

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    let currentUser = sessionStorage.getItem('currentUser') || '';
    if (currentUser === '') {
      this.router.navigate(['login']);
    }
    this.parsedData = JSON.parse(currentUser);
    if (this.parsedData.completedAt === null) {
      this.router.navigate(['home']);
    }
  }
}
