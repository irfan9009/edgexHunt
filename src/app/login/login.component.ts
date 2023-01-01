import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  err: any;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}
  register(form: NgForm) {
    console.log(form.value.email);
    const headers = { 'content-type': 'application/json' };
    this.http
      .post<any>(
        'http://localhost:3000/user/login',
        { email: form.value.email },
        { headers }
      )
      .subscribe({
        next: this.handleSuccess.bind(this),
        error: this.handleError.bind(this),
      });
  }
  handleSuccess(result: any) {
    console.log('result :>> ', result);
  }
  handleError(error: any) {
    console.log('error :>> ', error);
  }
}
