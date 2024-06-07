import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { Co2 } from '../../interface/co2';
import { DeviceDataService } from '../../services/device-data.service';
import { TablaComponent } from '../../components/tabla/tabla.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-c02',
  standalone: true,
  imports: [TablaComponent, NgxPaginationModule],
  templateUrl: './c02.component.html',
  styleUrl: './c02.component.css'
})
export class C02Component {
  p: number = 1;
  partesArreglo: any[] = [];
  private fechaActual : Date
  private labelsName :any[]=[]
  private co2Data : Co2[] = []
  private co2DataTabla : Co2[] = []

  public myChart!: Chart;
  private co2 : any = {
    value : 0,
    created_at : new Date(),
    timestamp : new Date()
  }


  constructor(private deviceService : DeviceDataService)
  {
    this.deviceService.getCo2LastValue().subscribe(
      response => 
      {
        this.co2 = response.last_value
        this.co2.imestamp = new Date(this.co2.timestamp)
        this.co2.value = this.co2.value.toFixed(2);
        console.log(this.co2)
      }
    )
    this.fechaActual = new Date()
  }


  ngOnInit(): void {
    this.deviceService.getDataTemperature().subscribe(
      (response : Co2[]) => 
      {
        this.co2DataTabla = response.map(co2 => 
          {
            const date = new Date(co2.timestamp)
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
            co2.timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${sign}${offsetHours}:${offsetMinutes}`
            return co2
          }
        )
        this.dividirArreglo()
      }
    )

    this.deviceService.getDataCo2().subscribe(
      (response : Co2[]) => 
      {
        this.co2Data = response.map(co2 => 
          {
            co2.timestamp = new Date(co2.timestamp)
            return co2
          }
        )
        this.labelsName = Array.from(new Set(this.co2Data.map(co2 => co2.timestamp.getMonth())));
        this.labelsName.sort((a, b) => a - b);
        this.preChart()
      }
    )
  }


  preChart()
  {
    const dateLabels = Array.from(new Set(this.co2Data.map(co2 => co2.timestamp.toISOString())));
    dateLabels.sort();
    const co2DataValues = this.co2Data.map(co2 => co2.value)
    const data = {
      labels: dateLabels.map(date => {
        const timestamp = new Date(date);
        return `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()} - ${timestamp.getHours()}:${timestamp.getMinutes()}`;
      }),
      datasets: [{
        label: 'Co2',
        data: co2DataValues,
        fill: false,
        borderColor: '#fca311',
        backgroundColor: '#fca311',
        color: "#000000",
        tension: 0.1
      }]
    }
    this.myChart = new Chart("chartCo2", {
      type : 'line',
      data : data
      }
    )
  }

  dividirArreglo() {
    const tamanoParte = 10
    this.partesArreglo = [];
  
    for (let i = 0; i < tamanoParte; i += tamanoParte) {
      const parte = this.co2DataTabla.slice(i, i + tamanoParte);
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

  get Co2()
  {
    return this.co2
  }

}
