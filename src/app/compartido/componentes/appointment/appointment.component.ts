import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  @Input() appointment: any; // Recibe una cita para editar o mostrar
  appointmentForm: FormGroup;
  hospitals: any[] = []; // Lista de hospitales
  isEditing: boolean = false; // Indica si estamos en modo de edición

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private hospitalService: HospitalService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadHospitals();
  }

  // Inicializa el formulario con valores predeterminados o datos existentes
  initializeForm(): void {
    this.isEditing = !!this.appointment;
    this.appointmentForm = this.fb.group({
      specialty: [this.appointment?.specialty || '', Validators.required],
      hospital: [this.appointment?.hospital || '', Validators.required],
      appointmentDate: [this.appointment?.appointmentDate || '', Validators.required],
      notes: [this.appointment?.notes || ''],
    });
  }

  // Cargar hospitales desde el servicio
  loadHospitals(): void {
    this.hospitalService.getHospitals().subscribe(
      (data) => (this.hospitals = data),
      (error) => console.error('Error al cargar hospitales:', error)
    );
  }

  // Enviar el formulario para crear o editar una cita
  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const appointmentData = this.appointmentForm.value;

    if (this.isEditing) {
      this.updateAppointment(appointmentData);
    } else {
      this.createAppointment(appointmentData);
    }
  }

  // Crear una nueva cita
  private createAppointment(appointmentData: any): void {
    this.appointmentService.crearCita(appointmentData).subscribe(
      (response) => {
        console.log('Cita creada con éxito:', response);
        // Lógica adicional como redirigir o mostrar un mensaje
      },
      (error) => console.error('Error al crear la cita:', error)
    );
  }

  // Actualizar una cita existente
  private updateAppointment(appointmentData: any): void {
    if (!this.appointment?.id) {
      console.error('No se encontró ID para actualizar la cita.');
      return;
    }

    this.appointmentService.actualizarCita(this.appointment.id, appointmentData).subscribe(
      (response) => {
        console.log('Cita actualizada con éxito:', response);
        // Lógica adicional como redirigir o mostrar un mensaje
      },
      (error) => console.error('Error al actualizar la cita:', error)
    );
  }
}
