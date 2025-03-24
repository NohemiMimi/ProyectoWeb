import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonInput, IonLabel, IonItem, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, FormsModule]
})
export class Tab1Page {
  aspersores = [
    { nombre: 'Aspersor 1', humedad: 0, encendido: true },
  ];
  
  selectedIndex: number | null = 0;

  constructor(private navCtrl: NavController) {}

  /** Enciende o apaga el aspersor seleccionado */
  toggleAspersor() {
    if (this.selectedIndex !== null) {
      this.aspersores[this.selectedIndex].encendido = !this.aspersores[this.selectedIndex].encendido;
      console.log(`Aspersor ${this.aspersores[this.selectedIndex].encendido ? 'encendido' : 'apagado'}`);
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