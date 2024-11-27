import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { appointment } from '../models/citasmedicas.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private collectionName = 'citas'; // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) {}

  // Crear una cita
  crearCita(cita: appointment): Observable<any> {
    return from(this.firestore.collection(this.collectionName).add(cita)).pipe(
      map((docRef) => ({ id: docRef.id, ...cita })),
      catchError((error) => {
        console.error('Error al crear la cita:', error);
        throw error;
      })
    );
  }

  // Obtener todas las citas
  obtenerCitas(): Observable<appointment[]> {
    return this.firestore
      .collection<appointment>(this.collectionName)
      .valueChanges({ idField: 'id' })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener las citas:', error);
          throw error;
        })
      );
  }

  // Obtener una cita por ID
  obtenerCita(id: string): Observable<appointment> {
    return this.firestore
      .collection(this.collectionName)
      .doc<appointment>(id)
      .valueChanges()
      .pipe(
        map((doc) => {
          if (!doc) {
            throw new Error(`No se encontró la cita con ID: ${id}`);
          }
          return { id, ...doc } as appointment;
        }),
        catchError((error) => {
          console.error('Error al obtener la cita:', error);
          throw error;
        })
      );
  }

  // Actualizar una cita
  actualizarCita(id: string, cita: Partial<appointment>): Observable<any> {
    return from(this.firestore.collection(this.collectionName).doc(id).update(cita)).pipe(
      map(() => ({ id, ...cita })),
      catchError((error) => {
        console.error('Error al actualizar la cita:', error);
        throw error;
      })
    );
  }

  // Eliminar una cita
  eliminarCita(id: string): Observable<any> {
    return from(this.firestore.collection(this.collectionName).doc(id).delete()).pipe(
      map(() => ({ id })),
      catchError((error) => {
        console.error('Error al eliminar la cita:', error);
        throw error;
      })
    );
  }
}
