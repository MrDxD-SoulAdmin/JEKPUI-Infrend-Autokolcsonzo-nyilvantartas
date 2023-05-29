import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehicleDTO } from 'Models';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<VehicleDTO[]>('/api/Vehicle');
  }
  Search_Vehicle_by_Rendszam(rendszam: string) {

    return this.http.get<VehicleDTO[]>('/api/vehicle/Rendszam/' + rendszam);
  }
  Search_Vehicle_by_tipus(tipus: string) {
    return this.http.get<VehicleDTO[]>('/api/vehicle/Tipus/' + tipus);
  }
  create(Vhc: VehicleDTO) {
    return this.http.put<VehicleDTO[]>('/api/vehicle/', Vhc);
  }
  NVRegister(data: VehicleDTO) {
    return this.http.post<VehicleDTO[]>('/api/vehicle/register', data);
  }
  kolcsonzes(data: VehicleDTO) {
    return this.http.post<VehicleDTO>('/api/vehicle/kolcson', data);
  }
  back(data: VehicleDTO){
    return this.http.post<VehicleDTO>('/api/vehicle/back', data);
  }
  getAllofmy(data: Number) {
    return this.http.get<VehicleDTO[]>('/api/Vehicle/my/' + data);
  }
  SelejtVehicle(data: VehicleDTO) {
    return this.http.post<VehicleDTO>('/api/vehicle/selejt', data);
  }
}
