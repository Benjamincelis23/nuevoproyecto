import { Component } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { appointment } from '../../models/citasmedicas.model';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage {

  fechaReserva: string = '';
  horaReserva: string = '';
  usuarioId: number = 1;
  titulo: string = '';
  descripcion: string = '';
  hospital: string = '';
  especialidad: string = '';

  constructor(private appointmentService: AppointmentService) { }

  realizarReserva() {
    // Verificar si todos los campos tienen un valor no vacío
    if (this.fechaReserva && this.horaReserva && this.titulo && this.descripcion && this.hospital && this.especialidad) {
      const cita: appointment = {
        id: '0', // O '0' si id es string, o 0 si es number
        fecha: this.fechaReserva,
        hora: this.horaReserva,
        usuarioId: this.usuarioId,
        titulo: this.titulo,
        descripcion: this.descripcion,
        hospital: this.hospital,
        especialidad: this.especialidad,
        items: [] // Si no tienes elementos para 'items', puedes inicializarlo como un arreglo vacío
      };

      // Llamar al método 'createAppointment' del servicio
      this.appointmentService.createAppointment(cita).subscribe(
        (response) => {
          console.log('Reserva exitosa', response);
          // Mostrar un mensaje de éxito al usuario
          alert('Reserva realizada con éxito');
        },
        (error) => {
          console.error('Error al realizar la reserva', error);
          // Mostrar un mensaje de error al usuario
          alert('Hubo un error al realizar la reserva. Intenta nuevamente.');
        }
      );
    } else {
      // Enviar una alerta si los campos están vacíos
      alert('Por favor, complete todos los campos');
    }
  }
}
