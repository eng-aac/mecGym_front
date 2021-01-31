import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer }  from 'src/app/models/customer';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.css']
})
export class SelectCustomerComponent implements OnInit {

  customers: Customer[] = new Array<Customer>();
  @Input('name') name: String;
  @Output('selectedCustomer') selectedCustomer = new EventEmitter();
  @Output('canceledCustomer') canceledCustomer = new EventEmitter();

  constructor( private db: AngularFirestore ) { }

  ngOnInit(): void {
    this.name = null;
    this.db.collection<Customer>('customers').get().subscribe((data) => {
      this.customers.length = 0;
      data.docs.forEach((item) => {
        const customer: Customer = item.data() as Customer;
        customer.id = item.id;
        customer.ref = item.ref;
        customer.seeable = false;
        this.customers.push(customer);               
      })
    })
  }

  browseCustomer(name: String){
    this.customers.forEach((data) => {
      if(data.name.toLowerCase().includes(name.toLowerCase())
        || data.surname.toLowerCase().includes(name.toLowerCase())){
        data.seeable = true;
      }else{
        data.seeable = false;
      }
    })
  }

  selectCustomer(customer: Customer){
    this.name = customer.name + ' ' + customer.surname;
    this.customers.forEach((data)  => {
      data.seeable = false;
    })

    this.selectedCustomer.emit(customer);
  }

  cancelCustomer(){
    this.name = undefined;
    this.canceledCustomer.emit();
  }
}
