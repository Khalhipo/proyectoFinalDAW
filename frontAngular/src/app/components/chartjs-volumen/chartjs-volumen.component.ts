import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-chartjs-volumen',
  templateUrl: './chartjs-volumen.component.html',
  styleUrls: ['./chartjs-volumen.component.css']
})
export class ChartjsVolumenComponent implements OnInit {

  grafica: Chart;
  categorias: string[] = [];
  meses: string[] = [];

  mesesFiltrado: string[] = [];

  categoriaFiltro: string = '';
  mesFiltro: string = '';
  data: any;

  constructor(private statsService: StatsService) { }
  
  ngOnInit(): void {
	this.grafica = new Chart('volumen',{
		type: 'bar',
			  data: {
				  labels: [],
				  datasets: [{
					  label: 'Volumen de trabajo',
					  backgroundColor: 'green',
					  borderColor: 'green',
					  data: [],
					  fill: false,
				  }]
			  },
			  options: {
				  responsive: true,
				  title: {
					  display: true,
					  text: 'Volumen de trabajo (Series x Reps)'
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
							  labelString: 'Volumen (Series x Rep)'
						  }
					  }]
				  }
			  }
	})
	this.iniciarChart();
  }

  iniciarChart(): void{
	this.statsService.obtenerStatsVolumen(this.categoriaFiltro,this.mesFiltro).subscribe(
		  respuesta => {
			  console.log(respuesta),
			  this.data = respuesta;
			  this.grafica.data.labels = respuesta.map(el => el.label);
			  this.grafica.data.datasets[0].data = respuesta.map(el => el.data);
			  this.categorias = respuesta.map(el=>el.categoria);
			  this.categorias = [...new Set(this.categorias)];

			  this.meses = respuesta.map(el => el.label.split("-")[1]+"-"+el.label.split("-")[0]);
			  this.meses = [...new Set(this.meses)];
			  this.mesesFiltrado = this.meses;
			  this.grafica.update();
		  },
		  error => {
			  console.log(error)
		  }
	  )
   }

  getStatsVolumen(): void{
	this.statsService.obtenerStatsVolumen(this.categoriaFiltro,this.mesFiltro).subscribe(
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
	this.getStatsVolumen();
   }

   filtrarMeses(): void {
	   if(this.categoriaFiltro==""){
		this.mesesFiltrado = this.meses;
	   } else {
		   this.mesesFiltrado = this.data.filter(el=> el.categoria==this.categoriaFiltro).map(el => el.label.split("-")[1]+"-"+el.label.split("-")[0]);
		   this.mesesFiltrado =  [...new Set(this.mesesFiltrado)];
	   }
	   this.mesFiltro = '';
   }

}
