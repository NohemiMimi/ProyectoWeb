import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; // Importa el servicio
import { UsersService } from '../services/users.service';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonDatetime, IonGrid, 
  IonRow, IonCol, IonButton
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';  // Importa FormsModule


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonGrid,
    IonRow,
    IonCol,
    FormsModule, 
    IonDatetime,
    IonButton,
    IonDatetime,
  ]
})
export class Tab2Page {
  dias = [
    { nombre: 'L', seleccionado: false },
    { nombre: 'M', seleccionado: false },
    { nombre: 'M', seleccionado: false },
    { nombre: 'J', seleccionado: false },
    { nombre: 'V', seleccionado: false },
    { nombre: 'S', seleccionado: false },
    { nombre: 'D', seleccionado: false }
  ];

  abrir: string = ''; // Hora de apertura
  cerrar: string = ''; // Hora de cierre
  humedad: number = 0; // Humedad del aspersor seleccionado

  constructor(
    private navCtrl: NavController, 
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.obtenerHumedad();
  }

  obtenerHumedad() {
    this.usersService.getUsers().subscribe(
      (data) => {
        if (data.length > 0) {
          this.humedad = parseFloat(data[0].humedad || '0'); // Tomamos la humedad del primer aspersor
        }
      },
      (error) => console.error('Error al obtener humedad:', error)
    );
  }

  // Verifica si la humedad es alta (50% o más)
  isHighHumidity(): boolean {
    return this.humedad >= 50;
  }

  toggleDia(index: number) {
    this.dias[index].seleccionado = !this.dias[index].seleccionado;
  }

  guardarSeleccion() {
    if (this.isHighHumidity()) {
      console.log('No se puede programar el riego porque la humedad es demasiado alta.');
      return;
    }

    const diasSeleccionados = this.dias.filter(dia => dia.seleccionado).map(dia => dia.nombre);

    if (this.abrir && this.cerrar && diasSeleccionados.length > 0) {
      console.log('Datos antes de enviar:', this.abrir, this.cerrar, diasSeleccionados);

      this.authService.programarRiego(this.abrir, this.cerrar, diasSeleccionados).subscribe(
        (response) => {
          console.log('Riego programado exitosamente:', response);
          this.navCtrl.navigateForward('/tabs/tab3');
        },
        (error) => {
          console.error('Error al programar el riego:', error);
        }
      );
    } else {
      console.log('Por favor, complete todos los campos.');
    }
  }
}