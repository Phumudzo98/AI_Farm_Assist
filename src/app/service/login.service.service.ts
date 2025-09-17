import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  token: string; // matches backend JSON key "token"
}

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private apiUrl = 'http://localhost:8080/api'; // backend URL

  constructor(private http: HttpClient) {}

  // Login method
  login(email: string, password: string): Observable<LoginResponse> {
    // Remove old token first
    localStorage.removeItem('token');

    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {
      username: email,
      password
    }).pipe(
      tap(response => {
        console.log('Login response from backend:', response);

        if (response.token) {
          // Store fresh JWT
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
