import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'StarWarsAngularProject', redirectTo: '', pathMatch: 'full' },
  { path: '', component: IndexComponent },
  { path: 'details/:property/:id', component: DetailsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ IndexComponent, DetailsComponent ];
