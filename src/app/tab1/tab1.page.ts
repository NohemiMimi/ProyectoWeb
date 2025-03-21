import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common'; // Importamos CommonModule para usar *ngIf
import { NavController } from '@ionic/angular'; // Importamos NavController
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton]
})

export class Tab1Page {
  aspersores = [
    { nombre: 'Aspersor 1', humedad: '40', temperatura: '25°C', encendido: false },
  ];
  
  selectedIndex: number | null = 0; // Ahora permitimos valores null

  constructor(private navCtrl: NavController, private user:UsersService) {} // Inyectamos NavController
  
  
  /** Selecciona un aspersor */
  selectAspersor(index: number) {
    this.selectedIndex = index;
  }

  /* agregarAspersor() {
    this.aspersores.push({
      nombre: "", // Se asignará después
      humedad: "", // Convertir a string
      temperatura: "", // Convertir a string
      encendido: false
    });
  
    this.reordenarAspersores(); // Se renumeran los nombres
  }
  
  
  eliminarAspersor() {
    if (this.selectedIndex !== null) {
      this.aspersores.splice(this.selectedIndex, 1); // Elimina el aspersor
      this.selectedIndex = null;
      this.reordenarAspersores(); // Renumera los nombres
    }
  }
  
  reordenarAspersores() {
    this.aspersores.forEach((aspersor, index) => {
      aspersor.nombre = `Aspersor ${index + 1}`;
    });
  } */
  
  

  /** Enciende o apaga el aspersor seleccionado */
  toggleAspersor() {
    if (this.selectedIndex !== null) {
      this.aspersores[this.selectedIndex].encendido = !this.aspersores[this.selectedIndex].encendido;
    }
  }


  /** Navega a Tab 2 */
  irATab2() {
    this.navCtrl.navigateForward('/tabs/tab2');
  }
}