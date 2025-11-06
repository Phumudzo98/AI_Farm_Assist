import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  token: string; 
}

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  
  login(email: string, password: string): Observable<LoginResponse> {
    
    localStorage.removeItem('token');

    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {
      username: email,
      password
    }).pipe(
      tap(response => {
        console.log('Login response from backend:', response);

        if (response.token) {
          
          localStorage.setItem('token', response.token.trim());
          console.log('Token saved in localStorage:', localStorage.getItem('token'));
        } else {
          console.error('No token returned from backend!');
        }
      })
    );
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('token');
    console.log('User logged out, token removed.');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
