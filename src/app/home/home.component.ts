import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  err: any;
  parsedData: any;
  token: any;
  submitDisable: Boolean;
  wrongAnswer: String;
  constructor(private http: HttpClient, private router: Router) {
    this.submitDisable = false;
    this.wrongAnswer = '';
  }

  ngOnInit(): void {
    let currentUser = sessionStorage.getItem('currentUser') || '';
    if (currentUser === '') {
      this.router.navigate(['login']);
    }
    this.parsedData = JSON.parse(currentUser);
    if (this.parsedData.completedAt != null) {
      this.router.navigate(['scorecard']);
    }
    this.token = this.parsedData.token; // your token
  }
  register(form: NgForm) {
    this.submitDisable = true;
    const headers = {
      'content-type': 'application/json',
      Authorization: `${this.token}`,
    };
    this.http
      .post<any>(
        'http://localhost:3000/puzzle/answer',
        { answer: form.value.answer },
        { headers }
      )
      .subscribe({
        next: this.handleSuccess.bind(this),
        error: this.handleError.bind(this),
      });
  }
  handleSuccess(result: any) {
    if (result.success === true) {
      sessionStorage.setItem(
        'currentUser',
        JSON.stringify({
          token: this.token,
          completedAt: Date.now(),
        })
      );
      this.router.navigate(['scorecard']);
    } else {
      timer(2000).subscribe(() => {
        this.buttonEnable();
      });
      this.wrongAnswer = result.message;
    }
  }
  handleError(error: any) {
    timer(5000).subscribe(() => {
      this.buttonEnable();
    });
    this.wrongAnswer = 'Sorry, Unknown error. Please contact admin';
    console.log('error :>> ', error);
  }
  buttonEnable() {
    this.submitDisable = false;
  }
}
