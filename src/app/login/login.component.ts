import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  err: any;
  validationmessage: String;
  submitDisable: Boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.validationmessage = '';
    this.submitDisable = false;
  }
  ngOnInit(): void {}
  register(form: NgForm) {
    this.submitDisable = true;
    const headers = { 'content-type': 'application/json' };
    const params = { email: form.value.email };
    this.http
      .get<any>('http://localhost:3000/user/login', { headers, params })
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
          token: result.data.token,
          email: result.data.user.email,
          completedAt: result.data.user.completedAt,
        })
      );
      this.router.navigate(['home']);
    } else {
      this.validationmessage = result.message;
      timer(1000).subscribe(() => {
        this.buttonEnable();
      });
    }
  }
  handleError(error: any) {
    timer(5000).subscribe(() => {
      this.buttonEnable();
    });
    this.validationmessage = 'Server Issue. Please contact admin';
    console.log('error :>> ', error);
  }
  buttonEnable() {
    this.submitDisable = false;
  }
}
