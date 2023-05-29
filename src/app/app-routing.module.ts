import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './Services/auth.service';
import { NewvehicleComponent } from './new-vehicle/new-vehicle.component';
import { LicenseComponent } from './license/license.component';
import { MyVehicleComponent } from './my-vehicle/my-vehicle.component';
import { VehicleUpdateComponent } from './vehicle-update/vehicle-update.component';

const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent
    
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path:'Register',
    component: RegisterComponent
  },
  {
    path:'License',
    component: LicenseComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  },
  {
    path:'newvehicle',
    component: NewvehicleComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  },
  {
    path:'MyVehicle',
    component: MyVehicleComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  },
  {
    path:'VehicleUpdate',
    component: VehicleUpdateComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
