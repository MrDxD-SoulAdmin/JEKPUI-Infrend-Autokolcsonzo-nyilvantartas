import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../Services/customer.service';
import { RegisterDTO } from 'Models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  RegisterForm = this.formBuilder.group({
    Nev: this.formBuilder.control(''),
    Telefonszam: this.formBuilder.control(''),
    Address: this.formBuilder.control(''),
    IG_Number: this.formBuilder.control(''),
    Email: this.formBuilder.control(''),
    Passwd: this.formBuilder.control('')
})

  constructor(
    private formBuilder: FormBuilder,
    private CustomerService: CustomerService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  Register() {
    const regdata = this.RegisterForm.value as RegisterDTO;
    this.CustomerService.Register(regdata).subscribe({
      next: (regdata) => {
        alert('Regisztráció Megtörtént!')
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Sikertelen regisztráció!')
      }
    });
    
  }

}
