import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonDatetime, IonGrid, 
  IonRow, IonCol, IonText, IonItem, IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [ 
    CommonModule, FormsModule, 
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonGrid, IonRow, IonCol, IonDatetime,
    IonItem, IonLabel
  ]
})
export class Tab2Page implements OnInit, OnDestroy {
  dias = [
    { nombre: 'L', seleccionado: false },
    { nombre: 'Ma', seleccionado: false },
    { nombre: 'Mi', seleccionado: false },
    { nombre: 'J', seleccionado: false },
    { nombre: 'V', seleccionado: false },
    { nombre: 'S', seleccionado: false },
    { nombre: 'D', seleccionado: false }
  ];

  abrir: string = '08:00';
  cerrar: string = '08:00';
  humedad: number | null = null;
  isGuardadoDisabled: boolean = false;
  humedadInterval: any;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.obtenerHumedad(); // Obtener humedad al cargar la página

    // Intervalo para actualizar la humedad cada 5 segundos
    this.humedadInterval = setInterval(() => {
      this.obtenerHumedad();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.humedadInterval) {
      clearInterval(this.humedadInterval);
    }
  }

  /** Obtiene la humedad desde la API */
  obtenerHumedad() {
    this.authService.getHumedad().subscribe(
      response => {
        this.humedad = response.humedad;
        console.log('Humedad obtenida en Tab2:', this.humedad);
        this.checkHumedad();
      },
      error => {
        console.error('Error obteniendo la humedad en Tab2:', error);
      }
    );
  }

  /** Verifica si la humedad es alta para deshabilitar la programación de riego */
  checkHumedad() {
    if (this.humedad !== null) {
      console.log('Humedad actual:', this.humedad);
  
      if (this.humedad >= 50 && !this.isGuardadoDisabled) {
        this.isGuardadoDisabled = true;
        this.mostrarNotificacion('La humedad es alta. No es necesario programar el riego.', 'danger');
      } else if (this.humedad < 50 && this.isGuardadoDisabled) {
        this.isGuardadoDisabled = false;
        this.mostrarNotificacion('La humedad ha bajado. Ahora puedes programar el riego.', 'success');
      }
    }
  }

  /** Alterna la selección de días de la semana */
  toggleDia(index: number) {
    this.dias[index].seleccionado = !this.dias[index].seleccionado;
  }

  /** Guarda la programación del riego */
  async guardarSeleccion() {
    if (this.humedad !== null && this.humedad >= 50) {
      this.isGuardadoDisabled = true;
      await this.mostrarNotificacion('La humedad es alta. No es necesario programar el riego.', 'danger');
      return;
    } else {
      this.isGuardadoDisabled = false;
    }

    const diasSeleccionados = this.dias.filter(dia => dia.seleccionado).map(dia => dia.nombre);

    if (!this.abrir || !this.cerrar || diasSeleccionados.length === 0) {
      await this.mostrarNotificacion('Por favor, complete todos los campos.', 'warning');
      return;
    }

    try {
      await this.authService.programarRiego(this.abrir, this.cerrar, diasSeleccionados).toPromise();
      await this.mostrarNotificacion('Riego programado exitosamente.', 'success');
      this.navCtrl.navigateForward('/tabs/tab1');
    } catch (error) {
      console.error('Error al programar el riego:', error);
      await this.mostrarNotificacion('Ocurrió un error al programar el riego.', 'danger');
    }
  }

  /** Muestra una notificación en pantalla */
  async mostrarNotificacion(message: string, tipo: string) {
    const alert = await this.alertController.create({
      header: tipo === 'success' ? 'Éxito' : tipo === 'danger' ? 'Error' : 'Advertencia',
      message: message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}
