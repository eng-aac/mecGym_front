import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListCustomerComponent } from './component/list-customer/list-customer.component';
import { AddCustomerComponent } from './component/add-customer/add-customer.component';
import { PricesComponent } from './component/prices/prices.component';
import { EnrolmentComponent } from './component/enrolment/enrolment.component';
import { ListEnrolmentComponent } from './component/list-enrolment/list-enrolment.component';
import { AboutComponent } from './component/about/about.component';
import { HelpComponent } from './component/help/help.component';

const routes: Routes = [
  { path: 'list-customer', component: ListCustomerComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'add-customer/:customerID', component: AddCustomerComponent },
  { path: 'prices', component: PricesComponent },
  { path: 'list-enrolment', component: ListEnrolmentComponent },
  { path: 'enrolment', component: EnrolmentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'help', component: HelpComponent },
  
  { path: 'enrolment', pathMatch:'full', redirectTo: 'enrolment' },
  { path: '**', pathMatch:'full', redirectTo: 'enrolment' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
