import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

/**
 * Services
 */
import { AuthenticationService } from './../../modules/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private _authentication: AuthenticationService,
    private _router: Router,
    public _snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit = () => {
    let params = {
      loginMode: 'emailAndPassword',
      login: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }

    this._authentication
    .login(params)
    .then(res => {
      if(res['cod'] == "l-01") {
        this._snackbar
        .open('Login feito com sucesso', '', {
          duration: 2000
        });

        this._router.navigate(['/main']);
      }
    })
  }
}
