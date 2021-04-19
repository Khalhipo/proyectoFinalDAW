import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mensaje: string = '';

  formLogin = this.fb.group({
    password:['',[Validators.required]],
    email:['', [Validators.required]]
  })

  constructor(private fb: FormBuilder, private servicioUsuario: UserService, private irHacia: Router) { }

  ngOnInit(): void {
    if(this.servicioUsuario.isLogged()){
      this.irHacia.navigate(['/profile']);
    }
  }


  submit(): void {
    this.servicioUsuario.acceso(this.formLogin.value).subscribe(
      respuesta => {
        console.log(respuesta);
        this.servicioUsuario.guardarToken(respuesta);
        this.irHacia.navigate(['/profile']);
      },
      error => {
      console.log(error)
      this.mensaje = error.error.error
      }
    )
  }

}
