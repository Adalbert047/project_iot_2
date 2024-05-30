import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceDataService {

  private urlAPI : string = 'https://industrial.api.ubidots.com/api/v1.6/devices/iot/'
  private token : string = 'BBUS-uyWzXckxWRcgvOCTCL8JFqppupC3W8'
  private httpHeaders = new HttpHeaders({ 
    'X-Auth-Token': this.token,
    'Content-Type': 'application/json'
  })
  constructor(private http : HttpClient) { }



  getDataTemperature() : Observable<any>
  {
    return this.http.get<any>(`${this.urlAPI}temperature`, {headers : this.httpHeaders}).pipe(
      catchError( e => {
          return throwError(e)
      })
    )
  }

  getDataHumedad() : Observable<any>
  {
    return this.http.get<any>(`${this.urlAPI}humidity`, {headers : this.httpHeaders}).pipe(
      catchError( e => {
          return throwError(e)
      })
    )
  }

  getDataCo2() : Observable<any>
  {
    return this.http.get<any>(`${this.urlAPI}co2`, {headers : this.httpHeaders}).pipe(
      catchError( e => {
          return throwError(e)
      })
    )
  }


  getDataDevice() : Observable<any>
  {
    return this.http.get<any>(`${this.urlAPI}`, {headers : this.httpHeaders}).pipe(
      catchError( e => {
          return throwError(e)
      })
    )
  }



}