import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Subscription, interval, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol]
})
export class Tab3Page implements OnInit, OnDestroy {
  aspersores: any[] = [];
  private subscription: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.cargarDatos();
    // Actualizar automáticamente cada 10 segundos
    this.subscription = interval(10000).subscribe(() => this.cargarDatos());
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Detener actualización automática al salir
    }
  }

  cargarDatos() {
    console.log('Obteniendo datos del servidor...');

    forkJoin({
      humedad: this.authService.getHumedad(),
      programacion: this.authService.getUltimaProgramacionRiego(), // ✅ Obtener solo el último registro
      estadoValvula: this.authService.getEstadoValvula()
    }).subscribe(
      ({ humedad, programacion, estadoValvula }) => {
        console.log('Datos recibidos:', { humedad, programacion, estadoValvula });

        this.aspersores = [{
          nombre: 'Aspersor 1',
          humedad: humedad?.humedad ?? 'N/A',
          abrir: programacion?.abrir ?? 'No programado',
          cerrar: programacion?.cerrar ?? 'No programado',
          dias: programacion?.dias ?? ['No programado'],
          encendido: estadoValvula?.estado ?? false
        }];
      },
      (error) => {
        console.error('Error cargando datos:', error);
      }
    );
  }
}
