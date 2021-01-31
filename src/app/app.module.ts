import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from "ngx-spinner";
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

import { MessageService } from './service/message.service';
import { environment } from '../environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ListCustomerComponent } from './component/list-customer/list-customer.component';
import { AddCustomerComponent } from './component/add-customer/add-customer.component';
import { PricesComponent } from './component/prices/prices.component';
import { EnrolmentComponent } from './component/enrolment/enrolment.component';
import { SelectCustomerComponent } from './component/select-customer/select-customer.component';
import { ListEnrolmentComponent } from './component/list-enrolment/list-enrolment.component';
import { NavbarLowerComponent } from './component/navbar-lower/navbar-lower.component';
import { HelpComponent } from './component/help/help.component';
import { AboutComponent } from './component/about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ListCustomerComponent,
    AddCustomerComponent,
    PricesComponent,
    EnrolmentComponent,
    SelectCustomerComponent,
    ListEnrolmentComponent,
    NavbarLowerComponent,
    HelpComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    BrowserAnimationsModule,
    ProgressbarModule.forRoot(),
    NgxSpinnerModule,
    NgxPaginationModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
