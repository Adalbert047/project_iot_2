import { Injectable } from '@angular/core';
import { Client, IClientOptions, MqttClient } from 'mqtt';
import { connect } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DeviceMqttService {

  private urlAPI : any  = 'https://industrial.api.ubidots.com'
  private token : string = 'BBUS-uyWzXckxWRcgvOCTCL8JFqppupC3W8'
  client! : MqttClient;


  constructor() { 


  }

  

}
