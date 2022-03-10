import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IObject } from 'src/app/shared/interfaces/IObject';
import { ObjectService } from 'src/app/shared/services/object/object.service';

@Component({
  selector: 'app-object-detail',
  templateUrl: './object-detail.component.html',
  styleUrls: ['./object-detail.component.scss'],
})
export class ObjectDetailComponent implements OnInit {
  public obj: Observable<IObject> = this.objService.object$;

  constructor(
    private objService: ObjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;

    setTimeout(() => {
      this.objService.getObject(id).subscribe();
    }, 1500);
  }
}
