import { Injectable } from '@angular/core';
import { CardView } from '../../interface/components/card-view';
import { DeviceDataService } from '../device-data.service';
import { Temperature } from '../../interface/temperature';
import { Humidity } from '../../interface/humidity';
import { Co2 } from '../../interface/co2';

@Injectable({
  providedIn: 'root'
})
export class CardViewService {
  private temp! : Temperature
  private humidity! : Humidity
  private co2! : Co2
  constructor(private deviceDataService : DeviceDataService) 
  { 
    this.deviceDataService.getTempLastValue().subscribe(
      response => 
      {
        this.temp = response.last_value
        this.temp.timestamp = new Date(this.temp.timestamp)
        console.log(this.temp)
      } 
     )

     this.deviceDataService.getHumidityLastValue().subscribe(
      response => 
      {
        this.humidity = response.last_value
        this.humidity.timestamp = new Date(this.humidity.timestamp)
        console.log(this.humidity)
      } 
     )

     this.deviceDataService.getCo2LastValue().subscribe(
      response => 
      {
        this.co2 = response.last_value
        this.co2.timestamp = new Date(this.co2.timestamp)
        console.log(this.co2)
      } 
     )
  }
  private cardsView :CardView[] = [
      {
        id: 1,
        nameCard : "Temperatura",
        last_value : "",
        last_time : "",
        description : "Dashboard de Temperatura",
        iconCard : "bi bi-thermometer icon-small",
        path: "temperatura",
      },
      {
        id: 2,
        nameCard : "Humedad",
        last_value : "",
        last_time : "",
        description : "Dashboard de Humedad",
        iconCard : "bi bi-cloud-fill icon-small",
        path: "humedad",
      },
      {
        id: 3,
        nameCard : "CO2",
        last_value : "",
        last_time : "",
        description : "Dashboard de CO2",
        iconCard : "bi bi-cloud-haze2-fill icon-small",
        path: "co2",
      },
    ]
  

  get CardsView()
  {
    return this.cardsView
  }

  // this.cardsView = [
  //   {
  //     id: 1,
  //     nameCard : "Temperatura",
  //     last_value : this.temp.value.toString(),
  //     last_time : this.temp.timestamp.toISOString(),
  //     description : "Dashboard de Temperatura",
  //     iconCard : "bi bi-thermometer icon-small",
  //     path: "temperatura",
  //   },
  //   {
  //     id: 2,
  //     nameCard : "Humedad",
  //     last_value : this.humidity.value.toString(),
  //     last_time : this.humidity.timestamp.toISOString(),
  //     description : "Dashboard de Humedad",
  //     iconCard : "bi bi-cloud-fill icon-small",
  //     path: "humedad",
  //   },
  //   {
  //     id: 3,
  //     nameCard : "CO2",
  //     last_value : this.co2.value.toString(),
  //     last_time : this.co2.timestamp.toISOString(),
  //     description : "Dashboard de CO2",
  //     iconCard : "bi bi-cloud-haze2-fill icon-small",
  //     path: "co2",
  //   },
  // ]
}
