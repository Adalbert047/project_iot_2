import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class DeviceWebSocketService {

  private urlAPI : string = 'https://industrial.api.ubidots.com'
  private token : string = 'BBUS-uyWzXckxWRcgvOCTCL8JFqppupC3W8'
  private deviceId : string = '66310cc466c09e000e02deb9'


  constructor(private socket : Socket) {

   }


   connectToUbidots()
   {
    this.socket.connect();
    this.socket.emit('suscribe', `/${this.deviceId}/lv`)
   }

   onDataRecived(callback : (data : any) => void)
   {
    this.socket.on('channel', (data : any) => 
    {
      callback(data)
    })
   }


   disconnect()
   {
    this.socket.disconnect()
   }
}
