import { Component} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  navigateToAllIssues(){
    this.router.navigate([`/all-issues`])
  }
}
