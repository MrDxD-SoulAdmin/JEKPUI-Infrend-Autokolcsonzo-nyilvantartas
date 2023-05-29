import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../Services/customer.service';
import { AuthService } from '../Services/auth.service';
import { LoginDTO } from 'Models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: this.formBuilder.control(''),
    password: this.formBuilder.control('')
  });

  constructor(
    private formBuilder: FormBuilder,
    private CustomerService: CustomerService,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService) { }

  login() {
    const loginData = this.loginForm.value as LoginDTO;

    this.CustomerService.login(loginData).subscribe({
      next: (response) => {
        this.authService.setToken(response.accessToken);
        this.authService.setUserid(response.userid);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.toastrService.error(err.error.error, 'Error');
      }
    });
  }
}