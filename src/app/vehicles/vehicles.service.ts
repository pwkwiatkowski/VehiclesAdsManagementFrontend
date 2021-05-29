import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Vehicle } from './vehicle';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class VehiclesService {

  vehiclesUrl = 'https://localhost:44338/api/vehicles';
  constructor(private http: HttpClient) { }

  /** GET vehicles from the server */
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.vehiclesUrl);
  }

  /** POST: add a new vehicle to the database */
addVehicle(vehicle: Vehicle): Observable<Vehicle> {
  return this.http.post<Vehicle>(this.vehiclesUrl, vehicle, httpOptions);
  }

  /** DELETE: delete the vehicle from the server */
deleteVehicle(id: number | undefined): Observable<unknown> {
  const url = `${this.vehiclesUrl}/${id}`; 
  return this.http.delete(url, httpOptions);
}

/** PUT: update the vehicle on the server. Returns the updated vehicle upon success. */
updateVehicle(id: number | undefined, vehicle: Vehicle): Observable<Vehicle> {
  const url = `${this.vehiclesUrl}/${id}`;
  return this.http.put<Vehicle>(url, vehicle, httpOptions);
}

}