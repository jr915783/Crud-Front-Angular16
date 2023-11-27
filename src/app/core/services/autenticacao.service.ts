import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  autenticar(UserName: string, Password: string): Observable<HttpResponse<AuthResponse>> {
        return this.http.post<AuthResponse>(
      `${this.apiUrl}/Account/login`,
      { UserName, Password },
      { observe: 'response'}      
    ).pipe(
      tap((response) => {        
        const authToken = response.body?.token || '';
        console.log("authToken", authToken);
        this.userService.salvarToken(authToken);
      })
    );
  }

}
