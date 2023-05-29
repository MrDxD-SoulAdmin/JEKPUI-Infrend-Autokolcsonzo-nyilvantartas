import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleDTO, CustomerDTO } from 'Models';
import { VehicleService } from '../Services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {
  licenseForm = this.formbuild.group({ Shearch_Data: this.formbuild.control('') });
  garage: VehicleDTO[] = [];
  constructor(
    private formbuild: FormBuilder,
    private service: VehicleService,
    private toastrService: ToastrService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (garage) => {
        this.garage = garage;
      }, error: (error) => console.error(error)
    })

  }

  kolcsonzes() {
    const kolcson = this.licenseForm.value as VehicleDTO;
    kolcson.The = {} as CustomerDTO;
    kolcson.The.Customer_ID = parseInt(AuthService.getUserid());
    this.service.kolcsonzes(kolcson).subscribe({
      next: (regdata) => {
        alert("Sikeres Kölcsönzés!");
        this.router.navigate(['/MyVehicle']);
      },
      error: (err) => {
        this.toastrService.error(err.error.error, 'Registration Failed!');
      }
    });
    this.licenseForm.setValue({ Shearch_Data: '' });
  }
}




