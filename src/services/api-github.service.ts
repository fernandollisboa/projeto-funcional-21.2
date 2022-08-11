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
  token = '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';
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `token ${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getAllIssues(userInfo: UserInfo) {
    console.log({ userInfo });
    return this.http
      .get<Issue[]>(
        `${this.apiURL}/repos/${userInfo.name}/${userInfo.repo}/issues`,
        this.options
      )
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    const { errorMsg } = error.error;
    window.alert(errorMsg);
    return throwError(() => errorMsg);
  }
}
