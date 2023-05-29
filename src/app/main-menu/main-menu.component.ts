import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleDTO } from 'Models';
import { VehicleService } from '../Services/vehicle.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  form = this.formbuild.group({ Shearch_Data: this.formbuild.control(''), Shearch_By: this.formbuild.control('') });
  garage: VehicleDTO[] = [];

  constructor(
    private formbuild: FormBuilder,
    private router: Router,
    private service: VehicleService
  ) { }
  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (garage) => {
        this.garage = garage;
      }, error: (error) => console.error(error)
    })

  }
  Indata = () => {
    if (this.form.get('Shearch_By')?.value == 'Type') {
      this.service.Search_Vehicle_by_tipus(this.form.value.Shearch_Data ? this.form.value.Shearch_Data : '').subscribe({
        next: (garage) => {
          this.garage = garage;
        }, error: (error) => alert("Nincs ilyen Típusú Jármű!")
      });
    } else if (this.form.get('Shearch_By')?.value == 'Rendszam') {
      this.service.Search_Vehicle_by_Rendszam(this.form.value.Shearch_Data ? this.form.value.Shearch_Data : '').subscribe({
        next: (garage) => {
          this.garage = garage;
        }, error: (error) => alert("Nincs ilyen Rendszámú Jármű!")
      });
    }
    this.form.setValue({Shearch_Data:'', Shearch_By:''});
    }


}
