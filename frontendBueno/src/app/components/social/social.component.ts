import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Mensaje } from 'src/app/models/mensaje';
import { MensajesService } from 'src/app/services/mensajes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  mensaje: string = '';
  mensajeEnviado: Mensaje = new Mensaje();
  temporizador: any = null;

  constructor(private userService: UserService, private servicioMensaje: MensajesService) { }

  userSelected: User = null;
  users: User[] = [];
  friendsUser: User[] = [];
  busqueda: string = '';
  infoUser: boolean = false;
  mensajesChat: Mensaje[] = [];

  usuarioLogueado: string = '';

  ngOnInit(): void {
    this.listarAmigos();
    this.obtenerUsuarioLogueado();
  }

  obtenerUsuarioLogueado(): void {
    this.userService.obtenerPerfil().subscribe(
      respuesta => {
        this.usuarioLogueado = respuesta.email;
      },
      error => {console.log(error),
        this.mensaje = error.error.error
        }
    )
  }

  info(): void {
    this.infoUser = !this.infoUser;
  }

  listarUsuario(): void {
    this.userService.listarUsuario(this.busqueda).subscribe(
      respuesta => {
        console.log(respuesta);
        this.users = respuesta;
        this.users = this.users.filter(el=>!this.existeAmigo(el));
        this.users = this.users.filter(el => el.email != this.usuarioLogueado)
      },
      error => {console.log(error),
      this.mensaje = error.error.error
      }
    );
  }

  existeAmigo(el){
    let salida = false;
    this.friendsUser.forEach(element => {
      if(element.email == el.email){
        salida = true;
      }
    })
    return salida;
  }

  listarMensajes(id: number): void {
    this.servicioMensaje.listarMensajes(id).subscribe(
      respuesta => {
        console.log(respuesta);
        this.mensajesChat = respuesta;
        this.listarAmigos();
      },
      error => {
        console.log(error),
        this.mensaje = error.error.error
      }
    )
  }

  buscarConRetraso(): void {
    if(this.temporizador==null){
      this.temporizador = setTimeout(()=>{this.listarUsuario();this.temporizador=null},1000)
    }
  }


  escribirMensaje(): void {
    this.mensajeEnviado.idDestinatario = this.userSelected.id;
    this.servicioMensaje.enviarMensaje(this.mensajeEnviado).subscribe(
      respuesta => {
        console.log(respuesta)
        this.mensajeEnviado = new Mensaje();
        this.listarMensajes(this.userSelected.id);
      },
      error => {console.log(error),
      this.mensaje = error.error.error
      }
    )
  }

  addFriend(user): void {
    console.log("user: " + user.id);
    this.userService.addFriend(user).subscribe(
      respuesta => {
        console.log(respuesta);
        this.listarAmigos();
        this.users = [];
        this.busqueda = '';
      },
      error => {console.log(error),
      this.mensaje = error.error.error}
    )
  }

  
  listarAmigos(): void {
    this.userService.listarAmigos().subscribe(
      respuesta => {
        console.log(respuesta);
        this.friendsUser = respuesta;
      },
      error => {
        console.log(error),
        this.mensaje = error.error.error
      }
    )
  }
  
  borrarAmigo(id: number): void {
    if(confirm("¿Estás seguro de borrar este amigo?")){
    this.userService.eliminarAmigo(id).subscribe(
      respuesta => {
        this.borrarChat(id);
        console.log(respuesta);
        this.listarAmigos();
        this.userSelected = null;
      },
      error => {
        console.log(error),
        this.mensaje = error.error.error
      }
    )
    }
  }

  borrarChat(id: number): void {
    if(confirm("¿Estás seguro de borrar el chat?")){
    this.servicioMensaje.borrarChat(id).subscribe(
      respuesta => {
        console.log(respuesta);
        this.listarMensajes(id);
      },
      error => {
        console.log(error),
        this.mensaje = error.error.error
      }
    )
  }
  }

}
