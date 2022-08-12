import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Issue from 'src/interfaces/Issue.interface';
import UserInfo from 'src/interfaces/UserInfo.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiGithubService {
  apiURL = `https://api.github.com`;
  token = '<INSERT_TOKEN_HERE';
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `token ${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getAllIssues(userInfo: UserInfo) {
    return this.http
      .get<Issue[]>(
        `${this.apiURL}/repos/${userInfo.name}/${userInfo.repo}/issues`,
        this.options
      )
      .pipe(catchError(this.handleError));
  }

  handleError(res: any) {
    const { status } = res;
    const { message } = res.error;
    const errMsg = `${status}: ${message}`;
    return throwError(() => errMsg);
  }
}
