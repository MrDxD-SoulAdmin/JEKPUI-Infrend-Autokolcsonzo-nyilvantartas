import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { VehicleService } from '../Services/vehicle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VehicleDTO } from 'Models';

@Component({
  selector: 'app-newvehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.css']
})
export class NewvehicleComponent {
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
  ) { }

  NewvehicleRegist() {
    const regdata = this.Newvehicleform.value as VehicleDTO;
    this.Vs.NVRegister(regdata).subscribe({
      next: (regdata) => {
        alert('Sikeres Jármű Felvitel!')
        this.router.navigate(['/']);
        this.Newvehicleform.setValue({} as VehicleDTO);

      },
      error: (err) => {
        alert('Sikertelen Jármű Felvitel!');
      }
    });


  }

  Selejt() {
    const regdata = this.Newvehicleform.value as VehicleDTO;
    this.Vs.SelejtVehicle(regdata).subscribe({
      next: () => {
        alert('Sikeres Jármű Felvitel!')
        this.router.navigate(['/']);
        this.Newvehicleform.setValue({} as VehicleDTO);
        location.reload();
      },
      error: (err) => {
        alert('Sikertelen Jármű Felvitel!');
      }
    });

  };


















































































































































}