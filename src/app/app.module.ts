import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllIssuesComponent } from './all-issues/all-issues.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, MainMenuComponent, AllIssuesComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
