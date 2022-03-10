import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IObject } from 'src/app/shared/interfaces/IObject';
import { ObjectService } from 'src/app/shared/services/object/object.service';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss'],
})
export class ObjectListComponent implements OnInit {
  public listObj: Observable<IObject[]> = this.objService.objects$;

  constructor(private objService: ObjectService) {}

  ngOnInit(): void {}
}
