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
  lat = 51.678418;
  lng = 7.809007;
  public positionList: Observable<Position[]>;

  constructor(
    private objService: ObjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.positionList = this.objService.getPosition(id);
    this.getLocation();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log(longitude);
        console.log(latitude);
      });
    } else {
      console.log('No support for geolocation');
    }
  }
}
