import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { IndexComponent } from './index/index.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes =[
  { path: 'index', component: IndexComponent },
  
  { path: 'details/:property/:id', component: DetailsComponent},
  { path: '', redirectTo:'/index', pathMatch:'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[ IndexComponent, DetailsComponent]
