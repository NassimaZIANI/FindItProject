import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Object } from '../../interfaces/object';

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  public objects$: BehaviorSubject<Object[]> = new BehaviorSubject(null);

  constructor() {}

  public getObjectList() {}

  public getObject() {}

  public addObject() {}

  public deleteObject() {}
}
