import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerDTO, VehicleDTO } from 'Models';
import { VehicleService } from '../Services/vehicle.service';
import { AuthService } from '../Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-vehicle',
  templateUrl: './my-vehicle.component.html',
  styleUrls: ['./my-vehicle.component.css']
})
export class MyVehicleComponent {
  BackForm = this.formbuild.group({
    Shearch_Data: this.formbuild.control(''),
    Shearch_Data_km: this.formbuild.control(null),
    Shearch_Data_damaged: this.formbuild.control(false)
  });
  mygarage: VehicleDTO[] = [];

  constructor(
    private formbuild: FormBuilder,
    private router: Router,
    private service: VehicleService,
    private toastrService: ToastrService
  ) { }
  ngOnInit(): void {
    this.service.getAllofmy(parseInt(AuthService.getUserid())).subscribe({
      next: (mygarage) => {
        this.mygarage = mygarage;
      }, error: (error) => console.error(error)
    })

  }
  Back() {
    const kolcson = this.BackForm.value as VehicleDTO;
    kolcson.The = {} as CustomerDTO;
    kolcson.The.Customer_ID = parseInt(AuthService.getUserid());
    this.service.back(kolcson).subscribe({
      next: (regdata) => {
        alert("Fizetendő: " + regdata);
        this.BackForm.setValue({ Shearch_Data: '', Shearch_Data_km: null, Shearch_Data_damaged: false });
        location.reload();
      },
      error: (err) => {
        alert("Nem jó paraméter!")
      }
    });

  }
}
