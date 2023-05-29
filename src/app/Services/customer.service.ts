import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessTokenDTO, LoginDTO, RegisterDTO } from 'Models';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  login(data: LoginDTO) {
    return this.http.post<AccessTokenDTO>('/api/Customair/login', data);
}
  Register(data: RegisterDTO) {
    return this.http.post<AccessTokenDTO>('/api/Customair/register', data);
}
}