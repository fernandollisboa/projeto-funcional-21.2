import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import UserInfo from 'src/interfaces/UserInfo.interface';
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainMenuComponent {
  constructor(private router: Router) {}

  navigateToAllIssues(userInfo: UserInfo) {
    if (!userInfo.name.trim() || !userInfo.repo.trim()) {
      alert('Preencha os campos corretamente!');
    } else {
      this.router.navigate([`/all-issues/${userInfo.name}/${userInfo.repo}`]);
    }
  }
}
