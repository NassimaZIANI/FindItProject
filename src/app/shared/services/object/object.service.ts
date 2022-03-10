import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { IObject } from '../../interfaces/IObject';
import { filter, first, map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  public objects$: BehaviorSubject<IObject[]> = new BehaviorSubject(null);
  public object$: BehaviorSubject<IObject> = new BehaviorSubject(null);
  private userId: string = JSON.parse(localStorage.getItem('user')!).uid;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {}

  public getObjectList(): Observable<IObject[]> {
    return this.db
      .collection('objects', (ref) => ref.where('uid', '==', this.userId))
      .snapshotChanges()
      .pipe(
        map((snaps) =>
          snaps.map((snap) => {
            let obj = new Object({
              id: snap.payload.doc.id,
              ...(snap.payload.doc.data() as {}),
            });
            let myObj = obj as IObject;
            console.log(myObj);

            return myObj;
          })
        ),
        tap((obj) => {
          this.objects$.next(obj);
        }),
        first()
      );
  }

  public getObject(id: string): Observable<IObject> {
    let objects = this.objects$.value;

    console.log(objects);

    if (objects) {
      let obj = objects.filter((x) => x.id === id)[0];
      this.object$.next(obj);
      return this.object$;
    }
    return null;
  }

  public async addObject(obj: IObject): Promise<boolean> {
    console.log(obj);
    let des = obj.description;
    if (des === '') des = null;

    // Add a new document with a generated id.
    return this.db
      .collection('objects')
      .add({
        name: obj.name,
        description: des,
        uid: this.userId,
      })
      .then((docRef) => {
        obj.id = docRef.id;
        console.log(obj);

        let objects = this.objects$.value;
        this.objects$.next([...objects, obj]);
        return true;
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        return false;
      });
  }

  public deleteObject() {}
}
