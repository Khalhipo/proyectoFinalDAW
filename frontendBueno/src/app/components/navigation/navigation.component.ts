import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

 constructor(private servicioUsuario: UserService, private irHacia: Router) { }

  ngOnInit(): void {
  }

  doLogout(): void {
    this.servicioUsuario.logOut();
    this.irHacia.navigate(['/login']);
  }

  fnLogged(): boolean {
    return this.servicioUsuario.isLogged();
  }

}
