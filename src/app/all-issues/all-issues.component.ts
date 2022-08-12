import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Issue from 'src/interfaces/Issue.interface';
import Label from 'src/interfaces/Label.interface';
import UserInfo from 'src/interfaces/UserInfo.interface';
import { ApiGithubService } from 'src/services/api-github.service';
import { distinct, orderBy } from '../../utils/index';

@Component({
  selector: 'app-all-issues',
  templateUrl: './all-issues.component.html',
  styleUrls: ['./all-issues.component.css'],
})
export class AllIssuesComponent implements OnInit {
  issues: Issue[];
  userInfo: UserInfo;
  labels: Label[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private apiGitHub: ApiGithubService
  ) {
    const name: string = route.snapshot.params['name'];
    const repo: string = route.snapshot.params['repo'];
    this.userInfo = { name, repo };
    this.issues = [];
    this.labels = [];
  }

  ngOnInit() {
    this.apiGitHub.getAllIssues(this.userInfo).subscribe({
      next: (data: Issue[]) => {
        this.issues = data;
        this.labels = distinct(
          'name',
          this.issues.flatMap((i) => i.labels.map((label) => label))
        );
      },
      error: (e) => {
        window.alert(e);
        this.router.navigate([`/`]);
      },
    });
  }

  filterIssuesByLabel(labelName: string): void {
    if (!labelName.trim()) {
      this.ngOnInit();
      return;
    }
    this.issues = this.issues.filter((iss) =>
      iss.labels.some((lb) => lb.name === labelName)
    );
  }

  sortIssuesByComments(criteria: string): void {
    if (criteria === 'asc') {
      this.issues = orderBy('comments', this.issues);
    }

    if (criteria === 'desc') {
      this.issues = orderBy('comments', this.issues).reverse();
    }
  }
}
