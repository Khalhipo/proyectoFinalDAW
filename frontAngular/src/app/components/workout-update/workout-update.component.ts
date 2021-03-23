import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EjercicioLista, EjercicioMostrar } from 'src/app/interfaces/ejercicio';
import { Entrenamiento } from 'src/app/interfaces/entrenamiento';
import { EntrenamientoService } from 'src/app/services/entrenamiento.service';

@Component({
  selector: 'app-workout-update',
  templateUrl: './workout-update.component.html',
  styleUrls: ['./workout-update.component.css']
})
export class WorkoutUpdateComponent implements OnInit {


  @Input() fecha: {day:"",month:"",year:""};
  @Output() changeComponent = new EventEmitter<string>();

  constructor(private entrenamientoService: EntrenamientoService, private irHacia: Router) { }

  listaEjercicios: EjercicioLista[] = [];
  listaEjerciciosMostrar: EjercicioLista[] = [];
  ejerciciosETTO: EjercicioMostrar[] = [];

  categorias: string[] = [];

  ejercicio: EjercicioMostrar = {id_ejercicio: null, nombre: "", categoria: "", series: null, repeticiones: null, peso: null};

  comentario: string;
  pesoCorporal: number;
  id_entrenamiento: number;

  entrenamiento: Entrenamiento;

  mensaje: string = '';
  mensajeModal: string ='';

  nuevoEjercicio: EjercicioLista = {nombre:"",categoria:""};

  ngOnInit(): void {
    this.listarEjercicios();
    this.recuperarEtto();
  }

  cambiarComponente() {
      this.changeComponent.emit("detail");
  }

  listarEjercicios(): void {
    this.entrenamientoService.listarEjercicios().subscribe(
      respuesta => {
        console.log(respuesta);
        this.listaEjercicios = respuesta;
        this.categorias = this.listaEjercicios.map(el=>el.categoria);
        this.categorias = [...new Set(this.categorias)];
        //this.listaEjerciciosMostrar = this.listaEjercicios.filter(el=> el.categoria == this.categorias[0]);
      },
      error => {
        console.log(error),
        this.mensaje = error.error.error
      }
    )
  }

  addEjercicio(): void {
    let ejercicioValido = true;
    if(this.ejercicio.series <= 0 || this.ejercicio.repeticiones <= 0 || this.ejercicio.peso < 0){
      this.mensaje = 'Series mínimas 1, Repeticiones mínimas 1, Peso mínimo 0';
      ejercicioValido = false;
    }
      
    if(this.ejercicio.series == null || this.ejercicio.repeticiones == null || this.ejercicio.peso == null) {
      this.mensaje = "Series, Repeticiones y Peso son obligatorios";
      ejercicioValido = false;
  
    } 
  
    if(this.ejercicio.nombre == "") {
      this.mensaje = 'Selecciona un ejercicio';
      ejercicioValido = false;
    }
  
    if((this.ejercicioRepetido(this.ejercicio.nombre) && this.ejerciciosETTO.length > 0)) {
      this.mensaje = "Este ejercicio ya está incluido en el ETTO";
      ejercicioValido = false;
    }
  
  if(ejercicioValido){
  this.mensaje = '';
  this.ejerciciosETTO.push({id_ejercicio: this.ejercicio.id_ejercicio,nombre:this.ejercicio.nombre, categoria: this.ejercicio.categoria, 
  series: this.ejercicio.series,repeticiones: this.ejercicio.repeticiones, peso: this.ejercicio.peso});
  this.ejercicio.series = null;
  this.ejercicio.repeticiones = null;
  this.ejercicio.peso = null;
  this.ejercicio.nombre = '';
  this.ejercicio.id_ejercicio = null;
}
  }

  ejercicioRepetido(nombre: string): boolean {
    let salida = true;

    if(this.ejerciciosETTO.filter(el=>el.nombre == nombre).length == 0){
      salida = false;
    }
    return salida;
  }

  cambiarEjercicio(e) {
   this.ejercicio.nombre = this.listaEjerciciosMostrar.filter(el => el.id == e.target.value)[0].nombre; 
  }

  limpiarEjercicio(e) {
    this.listaEjerciciosMostrar = [];
  }

  borrarEjercicio(ej: EjercicioMostrar): void {
    this.ejerciciosETTO = this.ejerciciosETTO.filter(el=> el != ej);
  }

  filtrarCategoria(e): void {
    this.listaEjerciciosMostrar = this.listaEjercicios.filter(el=> el.categoria == this.ejercicio.categoria);
  }

  editarEtto(): void {
    let ettoValido = true;
    if(this.ejerciciosETTO.length == 0) {
      ettoValido = false;
      this.mensaje = 'No has añadido ningún ejercicio';
    }

    if(this.pesoCorporal<0) {
      this.mensaje = 'El peso corporal no puede ser negativo';
      ettoValido = false;
    }

    if(ettoValido) {
      this.mensaje = '';
    this.entrenamiento = {
      id: this.id_entrenamiento,
      fecha: this.fecha.year + "-" + this.fecha.month + "-" + this.fecha.day,
      comentario: this.comentario?this.comentario:null,
      pesoCorporal: this.pesoCorporal?this.pesoCorporal:null,
      ejercicios: this.ejerciciosETTO
    }
    this.entrenamientoService.editarEtto(this.entrenamiento).subscribe(
      respuesta => {
        console.log(respuesta);
      }
    )
    this.cambiarComponente();
  }
  }

  recuperarEtto(): void {
    let fechaFormatted = this.fecha.year + "-" + this.fecha.month + "-" + this.fecha.day;
    this.entrenamientoService.recuperarEtto(fechaFormatted).subscribe(
      respuesta => {
        console.log(respuesta),
        this.comentario = respuesta.comentario;
        this.pesoCorporal = respuesta.pesoCorporal;
        this.ejerciciosETTO = respuesta.ejercicios;
        this.id_entrenamiento = respuesta.id;
      }
    )
  }

  crearEjercicio() {
    console.log("nombre:" + this.nuevoEjercicio.nombre + " categoria: " + this.nuevoEjercicio.categoria)
    this.entrenamientoService.crearEjercicio(this.nuevoEjercicio).subscribe(
      respuesta => {
        console.log(respuesta);
        this.mensajeModal = 'Ejercicio creado correctamente';
        setTimeout(()=>this.mensajeModal = '',1000);
        this.nuevoEjercicio = {nombre:"",categoria:""};
        this.listarEjercicios();
      },
      error => {
        console.log(error),
        this.mensajeModal = error.error.error
      }
    )
  }

  limpiarCampos() {
    this.nuevoEjercicio.categoria = '';
    this.nuevoEjercicio.nombre = '';
    this.mensajeModal = '';
  }

}

