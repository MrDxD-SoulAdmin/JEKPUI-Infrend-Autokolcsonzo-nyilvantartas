import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleDTO } from 'Models';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from '../Services/vehicle.service';

@Component({
  selector: 'app-vehicle-update',
  templateUrl: './vehicle-update.component.html',
  styleUrls: ['./vehicle-update.component.css']
})
export class VehicleUpdateComponent {
  Newvehicleform = this.formBuilder.group({
    Tipus: this.formBuilder.control(''),
    Gyarto: this.formBuilder.control(''),
    Rendszam: this.formBuilder.control(''),
    AlvazSzam: this.formBuilder.control(''),
    Beszerzes: this.formBuilder.control(''),
    Kolcsonzse_Dij: this.formBuilder.control(''),
    Futott: this.formBuilder.control(''),
    status: this.formBuilder.control('')
})

constructor(
  private formBuilder: FormBuilder,
  private Vs: VehicleService,
  private router: Router,
  private toastrService: ToastrService
) {}

NewvehicleRegist() {
  const regdata = this.Newvehicleform.value as VehicleDTO;
  this.Vs.NVRegister(regdata).subscribe({
    next: (regdata) => {
      this.toastrService.success('New Vehicle Registration successful!');
      this.router.navigate(['/']);
    },
    error: (err) => {
      this.toastrService.error(err.error.error, 'New Vehicle Registration Failed!');
    }
  });
}}
