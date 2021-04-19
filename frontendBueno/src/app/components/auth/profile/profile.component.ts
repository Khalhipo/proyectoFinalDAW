import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  inputBorrar: string = '';
  mostrarEditar: boolean = false;
  mostrarEliminar: boolean = false;
  mostrarEditarEliminar: boolean = false;
  perfil: User = {};
  mensaje = '';

  formPerfil = this.fb.group({
    nombre:[''],
    password:['',[Validators.required,Validators.minLength(6)]],
    email:['', [Validators.required, Validators.email]],
    sexo:[''],
    peso:[''],
    altura:['']
  });

  constructor(private servicioUsuario: UserService, private fb: FormBuilder, private irHacia: Router) { }
  
  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.servicioUsuario.obtenerPerfil().subscribe(
      respuesta => {
        console.log(respuesta);
        this.perfil = respuesta;
        this.formPerfil.patchValue(respuesta);
      },
      error => {console.log(error),
        this.mensaje = error.error.error
        }
    )
  }

  editarPerfil(): void {
    this.servicioUsuario.editarPerfil(this.formPerfil.value).subscribe(
      respuesta => {
        console.log(respuesta);
        this.cargarPerfil();
        this.mostrarEditar = false;
      },
      error => {console.log(error),
        this.mensaje = error.error.error
        }
    )
  }

  eliminarUsuario(): void {
    this.servicioUsuario.eliminarUsuario().subscribe(
      respuesta => {
        console.log(respuesta);
        this.servicioUsuario.logOut();
        this.irHacia.navigate(['/login']);
      },
      error => {console.log(error),
        this.mensaje = error.error.error
        }
    )
  }

  changeSexo(e): void {
    this.formPerfil.value.sexo.setValue(e.target.value, {
      onlySelf: true
    })
  }

  foto: File
tengoFoto(evento): void{
  if(evento.target.files){
    this.foto = evento.target.files[0]
  }
}
subirFoto(): void{
  const formData = new FormData()
  formData.append('imagen', this.foto)
  this.servicioUsuario.subirImagen(formData).subscribe(
    respuesta => {
      console.log(respuesta)
      this.cargarPerfil()
    },
    error => {console.log(error)}
  )
}


}
