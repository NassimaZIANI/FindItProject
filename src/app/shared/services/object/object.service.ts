import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { IObject } from '../../interfaces/IObject';
import { filter, first, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  public objects$: BehaviorSubject<IObject[]> = new BehaviorSubject(null);
  public object$: BehaviorSubject<IObject> = new BehaviorSubject(null);

  constructor(private db: AngularFirestore) {}

  public getObjectList(): Observable<IObject[]> {
    let user: any = JSON.parse(localStorage.getItem('user')!);
    return this.db
      .collection('objects', (ref) => ref.where('uid', '==', user.uid))
      .snapshotChanges()
      .pipe(
        map((snaps) =>
          snaps.map((snap) => {
            let obj = new Object({
              id: snap.payload.doc.id,
              ...(snap.payload.doc.data() as {}),
            });
            let myObj = obj as IObject;
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

    if (objects) {
      let obj = objects.filter((x) => x.id === id)[0];
      this.object$.next(obj);
      return this.object$;
    }
    return null;
  }

  public async addObject(obj: IObject): Promise<boolean> {
    let des = obj.description;
    if (des === '') des = null;

    let user: any = JSON.parse(localStorage.getItem('user')!);

    // Add a new document with a generated id.
    return this.db
      .collection('objects')
      .add({
        name: obj.name,
        description: des,
        uid: user.uid,
      })
      .then((docRef) => {
        obj.id = docRef.id;

        let objects = this.objects$.value;
        this.objects$.next([...objects, obj]);
        return true;
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        return false;
      });
  }

  public deleteObject(idObj: string) {
    this.db.collection('objects').doc(idObj).delete();
    let objects = this.objects$.value;
    if (objects) {
      const itemsWithoutDeleted = objects.filter(({ id }) => id !== idObj);
      console.log(itemsWithoutDeleted);

      this.objects$.next(itemsWithoutDeleted);
    }
  }
}
