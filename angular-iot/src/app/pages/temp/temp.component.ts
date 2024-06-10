import { Component, OnInit } from '@angular/core';
import { DeviceDataService } from '../../services/device-data.service';
import { Temperature } from '../../interface/temperature';
import { Chart } from 'chart.js/auto';
import { ApiNodeService } from '../../services/api-node.service';
import { interval, Subscribable, Subscription, switchMap } from 'rxjs';
import { TablaComponent } from '../../components/tabla/tabla.component';
import { NgxPaginationModule } from 'ngx-pagination';
import e from 'cors';

@Component({
  selector: 'app-temp',
  standalone: true,
  imports: [TablaComponent, NgxPaginationModule],
  templateUrl: './temp.component.html',
  styleUrl: './temp.component.css'
})
export class TempComponent{
  p: number = 1;
  partesArreglo: any[] = [];
  private lables : string[] = []
  private labelsName :any[]=[]
  private temp : any = {
    value : 0,
    created_at : new Date(),
    timestamp : new Date()
  }
  private fechaActual : Date
  private updateSubscription! : Subscription
  private temperatureData : Temperature[] = []
  private temperatureDataNormal : Temperature[] = []
  public myChart!: Chart;


  constructor(private deviceService : DeviceDataService, private apiNode : ApiNodeService)
  {
    this.deviceService.getTempLastValue().subscribe(
      response => 
      {
        this.temp = response.last_value
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.temp.value = this.temp.value.toFixed(2);
        console.log("Conexion Exitosa")
        console.log(this.temp)

      },
      (error) => 
      {
        console.error(error)
      }
    )


    this.fechaActual = new Date()
  }

  ngOnInit(): void {
    this.preChart()

    this.deviceService.getDataTemperature().subscribe(
      (response : Temperature[]) => 
      {
        this.temperatureDataNormal = response.map(temp => 
          {
            const date = new Date(temp.timestamp)
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
            temp.timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${sign}${offsetHours}:${offsetMinutes}`
            return temp
          }
        )
        this.dividirArreglo()
      }
    )

    this.updateSubscription = interval(2000).pipe(
      switchMap(() => this.deviceService.getDataTemperature())
    ).subscribe((response: Temperature[]) => {
      this.temperatureData = response.map(temp => ({
        ...temp,
        timestamp: new Date(temp.timestamp)
      }))
      this.updateChart()
    });
  }


  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe()
    }
  }

  preChart()
  { 
    this.deviceService.getDataTemperature().subscribe((response: Temperature[]) => {
      this.temperatureData = response.map(temp => ({
        ...temp,
        timestamp: new Date(temp.timestamp)
      }));


      const invertedDateLabels = this.temperatureData.map(temp => temp.timestamp.toLocaleTimeString()).reverse();
      const invertedTempValues = this.temperatureData.map(temp => temp.value).reverse();

      const data = {
        labels: invertedDateLabels,
        datasets: [{
          label: 'Temperature',
          data: invertedTempValues,
          fill: false,
          borderColor: '#eddea4',
          backgroundColor: '#eddea4',
          color: "#000000",
          tension: 0.1
        }]
      }

      this.myChart = new Chart('chartTemp', {
        type: 'line',
        data: data,
      })
    })
  }

  updateChart(): void {
    const invertedDateLabels = this.temperatureData.map(temp => temp.timestamp.toLocaleTimeString()).reverse();
    const invertedTempValues = this.temperatureData.map(temp => temp.value).reverse();

    this.myChart.data.labels = invertedDateLabels
    this.myChart.data.datasets[0].data = invertedTempValues
    this.myChart.update()
  }

  dividirArreglo() {
    const tamanoParte = 10
    this.partesArreglo = [];
  
    for (let i = 0; i < this.temperatureDataNormal.length; i += tamanoParte) {
      const parte = this.temperatureDataNormal.slice(i, i + tamanoParte);
      this.partesArreglo.push(parte);
    }
  }


  get TemperatureData()
  {
    return this.temperatureData
  }


  get Temp(){
    return this.temp
  }

  get FechaActual()
  {
    return this.fechaActual
  }

  get ArregloDividido()
  {
    return this.partesArreglo
  }
}
