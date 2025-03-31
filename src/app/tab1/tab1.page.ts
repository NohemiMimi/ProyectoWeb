import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonLabel, IonItem, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, FormsModule]
})
export class Tab1Page implements OnInit {
  aspersores = [
    { nombre: 'Aspersor 1', humedad: 0, encendido: false },  // Cambiado encendido a false por defecto
  ];
  
  selectedIndex: number | null = 0;

  constructor(private navCtrl: NavController, private authService: AuthService) {}

  ngOnInit() {
    this.obtenerEstadoValvula();  // Obtener el estado de la válvula desde la base de datos
    this.obtenerHumedad();  // Obtener la humedad desde la base de datos
    this.recargarHumedadPeriodicamente();  // Recargar la humedad cada cierto tiempo
  }

  /** Obtener el estado del aspersor desde la base de datos */
  obtenerEstadoValvula() {
    this.authService.getEstadoValvula().subscribe(
      response => {
        if (this.selectedIndex !== null) {
          this.aspersores[this.selectedIndex].encendido = response.estado;  // Estado obtenido desde la base de datos
        }
      },
      error => {
        console.error('Error obteniendo el estado de la válvula:', error);
      }
    );
  }

  /** Obtener la humedad desde la base de datos */
  obtenerHumedad() {
    this.authService.getHumedad().subscribe(
      response => {
        if (this.selectedIndex !== null) {
          this.aspersores[this.selectedIndex].humedad = response.humedad;  // Humedad obtenida desde la base de datos
        }
      },
      error => {
        console.error('Error obteniendo la humedad:', error);
      }
    );
  }

  /** Actualizar la humedad cada cierto tiempo (ej. cada 5 segundos) */
  recargarHumedadPeriodicamente() {
    setInterval(() => {
      this.obtenerHumedad();
    }, 5000);  // Recarga la humedad cada 5 segundos
  }

  /** Enciende o apaga el aspersor y actualiza el estado en la base de datos */
  toggleAspersor() {
    if (this.selectedIndex !== null) {
      const nuevoEstado = !this.aspersores[this.selectedIndex].encendido;
      this.aspersores[this.selectedIndex].encendido = nuevoEstado;

      console.log(`Aspersor ${nuevoEstado ? 'encendido' : 'apagado'}`);

      // Enviar el estado actualizado a la API
      this.authService.controlValvula(nuevoEstado).subscribe(
        response => {
          console.log('Estado actualizado en la base de datos:', response);
        },
        error => {
          console.error('Error al actualizar el estado:', error);
        }
      );
    }
  }

  /** Navega a Tab 2 enviando la humedad */
  irATab2() {
    if (this.selectedIndex !== null) {
      let humedad = Number(this.aspersores[this.selectedIndex].humedad);
      
      if (isNaN(humedad) || humedad < 0) {
        console.warn('Humedad inválida, ajuste el valor.');
        return;
      }

      let navigationExtras: NavigationExtras = {
        queryParams: { humedad }
      };
      this.navCtrl.navigateForward('/tabs/tab2', navigationExtras);
    }
  }
}
