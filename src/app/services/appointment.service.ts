import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { appointment } from '../models/citasmedicas.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private firestore: AngularFirestore) { }

  createAppointment(cita: appointment): Observable<any> {
    // Aquí se agrega la cita a la colección 'citas' en Firestore
    return new Observable((observer) => {
      this.firestore.collection('citas').add(cita).then(
        (docRef) => {
          observer.next(docRef);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
