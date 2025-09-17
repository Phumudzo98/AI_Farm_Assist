import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    const authReq = token
      ? req.clone({
          setHeaders: { Authorization: `Bearer ${token.trim()}` } // use fresh token
        })
      : req;

    console.log('Sending Authorization header:', authReq.headers.get('Authorization'));

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Unauthorized! Redirecting to login...');
          // optionally: navigate to login page
        }
        return throwError(() => error);
      })
    );
  }
}
