import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  err: any;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}
  register(form: NgForm) {
    console.log(form.value.answer);
    const headers = { 'content-type': 'application/json' };
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
    console.log('result :>> ', result);
    this.router.navigate(['home']);
  }
  handleError(error: any) {
    console.log('error :>> ', error);
  }
}
