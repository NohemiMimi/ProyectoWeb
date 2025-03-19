import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, 
  IonCardHeader, IonCardTitle, IonCardContent, IonItem, 
  IonLabel, IonButton, IonInput, IonButtons 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    RouterModule, IonInput, IonButton, IonLabel, 
    IonItem, IonCardContent, IonCardTitle, IonCardHeader, 
    IonCard, IonContent, IonHeader, IonTitle, IonToolbar, 
    CommonModule, FormsModule, HttpClientModule
  ]
})
export class LoginPage implements OnInit {
  usuario: string = '';
  contrasena: string = '';

  constructor(private navCtrl: NavController, private authService: AuthService) {}

  ngOnInit() {}

  iniciarSesion() {
    if (this.usuario.trim() !== '' && this.contrasena.trim() !== '') {
      this.authService.loginUser(this.usuario, this.contrasena).subscribe(
        (response) => {
          if (response.Acreditado) {
            this.navCtrl.navigateForward('tabs/tab1');
          } else {
            alert(response.mensaje);
          }
        },
        (error) => {
          alert('Error al conectar con el servidor');
          console.error(error);
        }
      );
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}