import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { DetailsComponent } from './details/details.component';
import { MatExpansionModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpErrorInterceptor } from './httperrorinterceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'

const appRoutes: Routes = [
  { path: 'test', component: IndexComponent },
  { path: 'test2', component: DetailsComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    DetailsComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatExpansionModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatMenuModule,
    FormsModule,
    // RouterModule.forRoot(
    //   appRoutes,
    //   { enableTracing: true }
    // )
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }




