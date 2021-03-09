import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EjercicioEtto, EjercicioMostrar, EjercicioLista } from 'src/app/interfaces/ejercicio';
import { Entrenamiento } from 'src/app/interfaces/entrenamiento';
import { EntrenamientoService } from 'src/app/services/entrenamiento.service';

@Component({
  selector: 'app-workout-create',
  templateUrl: './workout-create.component.html',
  styleUrls: ['./workout-create.component.css']
})
export class WorkoutCreateComponent implements OnInit {

  @Input() fecha: {day:"",month:"",year:""};

  constructor(private entrenamientoService: EntrenamientoService, private irHacia: Router) { }

  listaEjercicios: EjercicioLista[] = [];
  listaEjerciciosMostrar: EjercicioLista[] = [];
  ejerciciosETTO: EjercicioMostrar[] = [];

  categorias: string[] = [];

  ejercicio: EjercicioMostrar = {id_ejercicio: null, nombre: "", categoria: "", series: null, repeticiones: null, peso: null};

  comentario: string;
  pesoCorporal: number;

  entrenamiento: Entrenamiento;

  mensaje: string = '';
  ejercicioEjemplo: EjercicioLista;

  ngOnInit(): void {
    this.listarEjercicios();
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
  if(this.ejercicio.series == null || this.ejercicio.repeticiones == null || this.ejercicio.nombre == "") {
    this.mensaje = "Faltan parámetros";
    ejercicioValido = false;

  } 
  if(this.ejercicioRepetido(this.ejercicio.nombre) && this.ejerciciosETTO.length > 0) {
    this.mensaje = "Este ejercicio ya está incluido en el ETTO";
    ejercicioValido = false;
  }
  
  if(ejercicioValido){
  this.ejerciciosETTO.push({id_ejercicio: this.ejercicio.id_ejercicio,nombre:this.ejercicio.nombre, categoria: this.ejercicio.categoria, 
  series: this.ejercicio.series,repeticiones: this.ejercicio.repeticiones, peso: this.ejercicio.peso});
  this.ejercicio.series = null;
  this.ejercicio.repeticiones = null;
  this.ejercicio.peso = null;
  this.ejercicio.nombre = '';
  this.listarEjercicios();
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

  crearEtto(): void {
    let ettoValido = true;
    if(this.ejerciciosETTO.length == 0) {
      ettoValido = false;
      this.mensaje = 'No has añadido ningún ejercicio';
    }
    if(ettoValido) {
    this.entrenamiento = {
      fecha: this.fecha.year + "-" + this.fecha.month + "-" + this.fecha.day,
      comentario: this.comentario?this.comentario:null,
      pesoCorporal: this.pesoCorporal?this.pesoCorporal:null,
      ejercicios: this.ejerciciosETTO
    }
    this.entrenamientoService.crearEtto(this.entrenamiento).subscribe(
      respuesta => {
        console.log(respuesta);
      }
    )
  }
    this.irHacia.navigate(['/']);
  }

}
