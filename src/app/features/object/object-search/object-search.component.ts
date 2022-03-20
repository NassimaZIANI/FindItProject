import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Position } from 'src/app/shared/interfaces/position';
import { ObjectService } from 'src/app/shared/services/object/object.service';

@Component({
  selector: 'app-object-search',
  templateUrl: './object-search.component.html',
  styleUrls: ['./object-search.component.scss'],
})
export class ObjectSearchComponent implements OnInit {
  public address: string;
  public positionList: Position[];
  public destination: any;
  public origin: any;

  constructor(
    private objService: ObjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.objService.getPosition(id).subscribe((positions) => {
      this.positionList = positions;
      this.destination = { lat: positions[0].lat, lng: positions[0].long };
      this.getAddress(positions[0]);
    });
    this.getLocation();
  }

  private getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.origin = { lat: latitude, lng: longitude };
        console.log(longitude);
        console.log(latitude);
      });
    } else {
      console.log('No support for geolocation');
    }
  }

  public getAddress(position: Position) {
    let geoCoder = new google.maps.Geocoder();
    geoCoder.geocode(
      { location: { lat: position.lat, lng: position.long } },
      (results: any, status: any) => {
        if (status === 'OK') {
          if (results[0]) {
            this.address = results[0].formatted_address;
            console.log(this.address);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }

  public getPosition(position: Position) {
    this.getAddress(position);
    this.destination = { lat: position.lat, lng: position.long };
  }
}
