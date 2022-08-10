import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Issue from "src/interfaces/issue.interface";
import { ApiGithubService } from "src/services/api-github.service";

@Component({
  selector:'app-all-issues',
  templateUrl:'./all-issues.component.html',
  styleUrls:['./all-issues.component.css']
})
export class AllIssuesComponent implements OnInit {
  issues: Issue[];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private apiGitHub: ApiGithubService) {
        this.issues = []
    }

  ngOnInit(): void {
    this.apiGitHub.getAllIssues().subscribe((data: Issue[]) => {
      this.issues = data
    
    })
  }

  listAllIssues(): Issue[] {
    return this.issues
  }
}
