import { Component, OnInit } from '@angular/core';
import { Vehicle } from './vehicle';
import { VehiclesService } from './vehicles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  providers: [VehiclesService],
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  editVehicle: Vehicle | undefined; // the vehicle currently being edited

  constructor(private vehiclesService: VehiclesService) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehiclesService.getVehicles()
      .subscribe(vehicles => {
        this.vehicles = vehicles; console.log(this.vehicles);
      });
  }

  add(marka: string, model: string, cena: string, rocznik: string, rodzaj: string, przebieg: string, pojemnosc: string): void {
    this.editVehicle = undefined;

    if (!marka || !model || !cena || !rocznik || !rodzaj || !przebieg || !pojemnosc) {
      return;
    }

    // The server will generate the id for this new vehicle
    const newVehicle: Vehicle = { 
      id: undefined,
      marka: marka,
      model: model,
      cenaPLN: parseInt(cena),
      rocznik: parseInt(rocznik),
      rodzajPaliwa: rodzaj,
      przebiegKM: parseInt(przebieg),
      pojemnoscCm3: parseInt(pojemnosc)
    }

    this.vehiclesService
      .addVehicle(newVehicle)
      .subscribe(vehicle => this.vehicles.push(vehicle));
  }

  delete(vehicle: Vehicle): void {
    this.vehicles = this.vehicles.filter(h => h !== vehicle);
    this.vehiclesService
      .deleteVehicle(vehicle.id)
      .subscribe();
    /*
    // oops ... subscribe() is missing so nothing happens
    this.vehicleService.deleteVehicle(vehicle.id);
    */
  }
  
  edit(vehicle: Vehicle) {
    this.editVehicle = vehicle;
  }

  update() {
    if (this.editVehicle) {
      this.vehiclesService
        .updateVehicle(this.editVehicle.id, this.editVehicle)
        .subscribe(vehicle => {
        // replace the vehicle in the vehicles list with update from server
        const ix = vehicle ? this.vehicles.findIndex(h => h.id === vehicle.id) : -1;
        if (ix > -1) {
          this.vehicles[ix] = vehicle;
        }
      });
      this.editVehicle = undefined;
    }
  }
}