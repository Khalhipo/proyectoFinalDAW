import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EnviarTokenInterceptor implements HttpInterceptor {

  constructor(private serviceUsuario: UserService, private irHacia: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let peticion = request;
    if(this.serviceUsuario.isLogged()){
      peticion = request.clone({
      setHeaders: {Authorization: this.serviceUsuario.leerToken()}
    })
  }
    return next.handle(peticion).pipe(
      catchError((err: HttpErrorResponse) =>{
        if(err.status === 401){
          this.serviceUsuario.logOut();
          this.irHacia.navigate(['/login']);
        }
        return throwError(err)
      })
    )
  }
}
