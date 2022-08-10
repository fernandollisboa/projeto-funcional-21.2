import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'
import Issue from 'src/interfaces/issue.interface';

@Injectable({
  providedIn: 'root'
})

export class ApiGithubService {

  apiURL = `https://api.github.com/repos/rails/rails/issues`
  token = ''

  config = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `token ${this.token}`
    }),
  };

  constructor(private http: HttpClient) { }

  getAllIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(
      this.apiURL,
      this.config
    ).pipe(retry(1), catchError(this.handleError))
  }

  handleError(error: any) {
    const {errorMessage} = error.error;
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
