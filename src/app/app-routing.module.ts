import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AllIssuesComponent } from './all-issues/all-issues.component'
import { MainMenuComponent } from './main-menu/main-menu.component'

const routes: Routes = [
    {
        path: '',
        component: MainMenuComponent,
    },
    {
        path: 'all-issues/:name/:repo',
        component: AllIssuesComponent,
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
