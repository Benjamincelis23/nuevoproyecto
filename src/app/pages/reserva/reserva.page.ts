import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {
  reservaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializamos el formulario
    this.reservaForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],  // Validación para 10 dígitos
      fecha: ['', Validators.required],
      especialidad: ['', Validators.required]
    });
  }

  ngOnInit() {}

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.reservaForm.valid) {
      console.log('Formulario enviado:', this.reservaForm.value);
      // Aquí puedes procesar la lógica para guardar la cita
    } else {
      console.log('Formulario no válido');
    }
  }
}
