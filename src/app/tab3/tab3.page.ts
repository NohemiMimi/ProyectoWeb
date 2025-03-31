import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { UsersService } from '../services/users.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol]
})
export class Tab3Page {
  aspersores = [
    { nombre: 'Aspersor 1', humedad: 60, abrir: '07:00', cerrar: '07:30', dias: ['L', 'M', 'V'], encendido: false }
  ];

  constructor(private userService: UsersService) {}

  toggleAspersor(index: number) {
    this.aspersores[index].encendido = !this.aspersores[index].encendido;
  }
}