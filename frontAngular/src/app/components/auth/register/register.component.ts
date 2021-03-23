import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  mensaje: string = '';

  formRegister = this.fb.group({
    nombre:['', [Validators.required, Validators.minLength(4)]],
    password:['',[Validators.required,Validators.minLength(6)]],
    password2:['', [Validators.required]],
    email:['', [Validators.required, Validators.email]],
    sexo:['',[Validators.required]],
    peso:['',[Validators.required,Validators.min(0)]],
    altura:['',[Validators.required,Validators.min(0)]]
  })
  constructor(private fb: FormBuilder, private servicioUsuario: UserService, private irHacia: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    if(this.formRegister.value.password == this.formRegister.value.password2){
      this.servicioUsuario.registrar(this.formRegister.value).subscribe(
        respuesta => {
          console.log(respuesta);
         this.servicioUsuario.guardarToken(respuesta);
          this.irHacia.navigate(['/perfil']);
        },
        error => {
          console.log(error)
          this.mensaje = error.error.error
        }
      );
    }
    else this.mensaje = "Las contraseñas no coinciden";
  }

  get nombre1(){
    return this.formRegister.get("nombre");
  }
  get password1(){
    return this.formRegister.get("password");
  }
  get email1(){
    return this.formRegister.get("email");
  }

  get peso1(){
    return this.formRegister.get("peso");
  }

  get altura1(){
    return this.formRegister.get("altura");
  }

  get sexo1(){
    return this.formRegister.get("sexo");
  }

  changeSexo(e): void {
    this.formRegister.value.sexo.setValue(e.target.value, {
      onlySelf: true
    })
  }

}
