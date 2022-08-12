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
  filteredIssues: Issue[];
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
    this.filteredIssues = [];
    this.labels = [];
  }

  fetchAllIssues() {
    this.apiGitHub.getAllIssues(this.userInfo).subscribe({
      next: (data: Issue[]) => {
        console.log(data);
        if (!data.length) {
          alert('O repositório não possui issues');
          this.router.navigate([`/`]);
        }
        this.issues = data;
        this.filteredIssues = this.issues;
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

  ngOnInit() {
    this.fetchAllIssues();
  }

  filterIssuesByLabel(labelName: string): void {
    if (!labelName.trim()) {
      this.filteredIssues = [...this.issues];
      return;
    }
    this.filteredIssues = [
      ...this.issues.filter((iss) =>
        iss.labels.some((lb) => lb.name === labelName)
      ),
    ];
  }

  sortIssuesByComments(criteria: string): void {
    if (criteria === 'asc') {
      this.filteredIssues = orderBy('comments', this.filteredIssues);
    }

    if (criteria === 'desc') {
      this.filteredIssues = orderBy('comments', this.filteredIssues).reverse();
    }
  }

  filterIssuesByState(state: string) {
    if (state === 'all') return;

    this.filteredIssues = this.filteredIssues.filter((i) => i.state === state);
  }

  updateSearchParameters(
    commentOrder: string,
    label: string,
    state: string
  ): void {
    this.filterIssuesByLabel(label);
    this.sortIssuesByComments(commentOrder);
  }
}
