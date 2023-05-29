
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './Services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    public authS: AuthService,
    private toastrService: ToastrService) { }

  logout() {
    this.authS.removeToken();
    this.authS.removeUserid();
    this.router.navigateByUrl('/');
    alert('Sikeres Kijelentkezés!')
  }

}