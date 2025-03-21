import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  public getUsers(): Observable<any>{
    return this.http.get("http://192.168.120.205:5000/getUsers").pipe(
      catchError(error => {
        console.error('Error al obtener usuarios:', error);
        return of({ error: 'Error al obtener los usuarios' });  // Retorna un error manejado
      })
    );
  }
  public auth(data:any):Observable<any>{
    return this.http.post("http://192.168.120.205:5000/logueo",data)
  }

  

  
}