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
  categoriaFiltro: string = '';
  mesFiltro: string = '';

  constructor(private statsService: StatsService) { }
  
  ngOnInit(): void {
	this.grafica = new Chart('volumen',{
		type: 'bar',
			  data: {
				  labels: [],
				  datasets: [{
					  label: 'Volumen de trabajo',
					  backgroundColor: 'red',
					  borderColor: 'red',
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
	this.getStatsVolumen();
  }

  getStatsVolumen(): void{
	this.statsService.obtenerStatsVolumen().subscribe(
		  respuesta => {
			  console.log(respuesta),
			  this.grafica.data.labels = respuesta.map(el => el.label);
			  this.grafica.data.datasets[0].data = respuesta.map(el => el.data);
			  this.categorias = respuesta.map(el=>el.categoria);
			  this.categorias = [...new Set(this.categorias)];
			  this.meses = respuesta.map(el => el.label.split("-")[1]+"-"+el.label.split("-")[0]);
			  this.meses = [...new Set(this.meses)];
			  this.grafica.update();
		  },
		  error => {
			  console.log(error)
		  }
	  )
   }

   filtrar(): void {

   }

}
