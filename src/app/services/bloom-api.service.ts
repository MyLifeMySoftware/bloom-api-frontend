import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BloomApiResponse, ErrorResponse } from '../models/bloom.interface';

@Injectable({
  providedIn: 'root',
})
export class BloomApiService {

  private apiUrl = 'http://localhost:8080/api/v1/bloom';

  constructor(private http: HttpClient) {}
  
  getAllData(): Observable<BloomApiResponse> {
    return this.http.get<BloomApiResponse>(`${this.apiUrl}/data`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      const serverError = error.error as ErrorResponse;
      errorMessage = serverError?.message || `Error ${error.status}: ${error.message}`;
    }
    
    console.error('Error en BloomApiService:', error);
    return throwError(() => new Error(errorMessage));
  }
}