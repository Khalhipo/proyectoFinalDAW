import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-chartjs-intensidad',
  templateUrl: './chartjs-intensidad.component.html',
  styleUrls: ['./chartjs-intensidad.component.css']
})
export class ChartjsIntensidadComponent implements OnInit {

	grafica: Chart;
	categorias: string[] = [];
	meses: string[] = [];
  
	mesesFiltrado: string[] = [];
  
	categoriaFiltro: string = '';
	mesFiltro: string = '';
	mesesCategorias: any;

  constructor(private statsService: StatsService) { }
  
  ngOnInit(): void {
	this.grafica = new Chart('intensidad',{
		type: 'bar',
			  data: {
				  labels: [],
				  datasets: [{
					  label: 'Intensidad de trabajo',
					  backgroundColor: 'blue',
					  borderColor: 'blue',
					  data: [],
					  fill: false,
				  }]
			  },
			  options: {
				  responsive: true,
				  title: {
					  display: true,
					  text: 'Intensidad de trabajo (Series x Reps x Peso)'
				  },
				  tooltips: {
					  mode: 'index',
					  intersect: false,
				  },
				  hover: {
					  mode: 'nearest',
					  intersect: true
				  },
				  scales: {
					  xAxes: [{
						  display: true,
						  scaleLabel: {
							  display: true,
							  labelString: 'Tiempo (sesión etto)'
						  }
					  }],
					  yAxes: [{
						  display: true,
						  scaleLabel: {
							  display: true,
							  labelString: 'Intensidad (Series x Rep x Peso)'
						  }
					  }]
				  }
			  }
	})
	this.getStatsIntensidad();
	this.rellenarCategorias();
  }
  rellenarCategorias(): void {
	this.statsService.obtenerCategorias().subscribe(
		respuesta => {
			console.log(respuesta);
			this.mesesCategorias = respuesta;
			this.categorias = respuesta.map(el=>el.categoria);
			this.categorias = [...new Set(this.categorias)];
			this.meses = respuesta.map(el => el.fecha.split("-")[1]+"-"+el.fecha.split("-")[0]);
			this.meses = [...new Set(this.meses)];
			this.mesesFiltrado = this.meses;
		}
	)
}

getStatsIntensidad(): void{
  this.statsService.obtenerStatsIntensidad(this.categoriaFiltro,this.mesFiltro).subscribe(
		respuesta => {
			console.log(respuesta),
			this.grafica.data.labels = respuesta.map(el => el.label);
			this.grafica.data.datasets[0].data = respuesta.map(el => el.data);
			this.grafica.update();
		},
		error => {
			console.log(error)
		}
	)
 }

 filtrarData(): void {
  this.getStatsIntensidad();
 }

 filtrarMeses(): void {
	 if(this.categoriaFiltro==""){
	  this.mesesFiltrado = this.meses;
	 } else {
		 this.mesesFiltrado = this.mesesCategorias.filter(el=> el.categoria==this.categoriaFiltro).map(el => el.fecha.split("-")[1]+"-"+el.fecha.split("-")[0]);
		 this.mesesFiltrado =  [...new Set(this.mesesFiltrado)];
	 }
	 this.mesFiltro = '';
 }

}
