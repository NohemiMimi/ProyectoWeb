import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api-l3zi.onrender.com';  // Cambia esto si tienes otra URL

  constructor(private http: HttpClient) {}

   // Método para iniciar sesión
   loginUser(usuario: string, contrasena: string): Observable<any> {
    const data = { user: usuario, pass: contrasena };
    return this.http.post(`${this.apiUrl}/logueo`, data);
  }
  // Método para registrar un nuevo usuario
  registerUser(usuario: string, contrasena: string): Observable<any> {
    const data = { user: usuario, pass: contrasena };
    return this.http.post(`${this.apiUrl}/register`, data);
  } 
 //olis
  // Método para programar el riego
  programarRiego(abrir: string, cerrar: string, dias: string[]): Observable<any> {
    const data = { abrir, cerrar, dias };
    return this.http.post(`${this.apiUrl}/programar_riego`, data);
  }
  
  // Método para cambiar el estado de la válvula
  controlValvula(estado: boolean): Observable<any> {
  return this.http.post(`${this.apiUrl}/control-valvula`, { estado });
  }

   // Obtener la humedad del aspersor
   getHumedad(): Observable<any> {
    return this.http.get(`${this.apiUrl}/humedad`);
  }

  // Obtener la programación de riego
  getProgramacionRiego(): Observable<any> {
    return this.http.get(`${this.apiUrl}/programar_riego`);
  }

  // Obtener el estado de la válvula
  getEstadoValvula(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetValvula`);
  }
  
  
}