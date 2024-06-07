import { Component } from '@angular/core';
import { Humidity } from '../../interface/humidity';
import { Chart } from 'chart.js/auto';
import { DeviceDataService } from '../../services/device-data.service';
import { TablaComponent } from '../../components/tabla/tabla.component';

@Component({
  selector: 'app-humidity',
  standalone: true,
  imports: [TablaComponent],
  templateUrl: './humidity.component.html',
  styleUrl: './humidity.component.css'
})
export class HumidityComponent {
  partesArreglo: any[] = [];
  private fechaActual : Date
  private lables : string[] = []
  private labelsName :any[]=[]
  private humidity : any = {
    value : 0,
    created_at : new Date(),
    timestamp : new Date()
  }
  private humidityData : Humidity[] = []
  private humidityDataTabla : Humidity[] = []
  public myChart!: Chart;


  constructor(private deviceService : DeviceDataService)
  {
    this.deviceService.getHumidityLastValue().subscribe(
      response => 
      {
        this.humidity = response.last_value
        this.humidity.timestamp = new Date(this.humidity.timestamp)
        this.humidity.value = this.humidity.value.toFixed(2);
        console.log(this.humidity)
      }
    )


    this.fechaActual = new Date()
  }

  ngOnInit(): void {
    this.deviceService.getDataHumedad().subscribe(
      (response : Humidity[]) => 
      {
        this.humidityDataTabla = response.map(hum => 
          {
            const date = new Date(hum.timestamp)
            const year = date.getFullYear();
            const month = date.getMonth() + 1 // Los meses en JavaScript son 0-11, por lo que se suma 1
            const day = date.getDate()
            const hours = date.getHours()
            const minutes = date.getMinutes()
            const seconds = date.getSeconds()

            const offset = -date.getTimezoneOffset();
            const sign = offset >= 0 ? '+' : '-';
            const offsetHours = (Math.floor(Math.abs(offset) / 60));
            const offsetMinutes = (Math.abs(offset) % 60);
            hum.timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${sign}${offsetHours}:${offsetMinutes}`
            return hum
          }
        )
        this.dividirArreglo()
      }
    )


    this.deviceService.getDataHumedad().subscribe(
      (response : Humidity[]) => 
      {
        this.humidityData = response.map(hum => 
          {
            hum.timestamp = new Date(hum.timestamp)
            return hum
          }
        )
        this.preChart()
      }
    )
  }

  preChart()
  {
    const dateLabels = this.humidityData.map(hum => hum.timestamp.toLocaleTimeString())
    const humidityValues = this.humidityData.map(hum => hum.value)
    const invertedDateLabels = dateLabels.reverse();
    const invertedHumidityValues = humidityValues.reverse();
    
    const data = {
      labels: invertedDateLabels,
      datasets: [{
        label: 'Humedad',
        data: invertedHumidityValues,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
    this.myChart = new Chart("chartHumidity", {
      type : 'line',
      data : data
      }
    )
  }


  dividirArreglo() {
    const tamanoParte = 10
    this.partesArreglo = [];

    for (let i = 0; i < tamanoParte; i += tamanoParte) {
      const parte = this.humidityDataTabla.slice(i, i + tamanoParte);
      this.partesArreglo.push(parte);
    }

    
  }

  get FechaActual()
  {
    return this.fechaActual
  }

  get ArregloDividido()
  {
    return this.partesArreglo
  }

  get Humidity()
  {
    return this.humidity
  }


}
