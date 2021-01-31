import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer }  from 'src/app/models/customer';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  customers: Customer[] = new Array<Customer>();
  @Input('name') name: String;
  pages: number = 1;
  loading: boolean = true;

  constructor( private db: AngularFirestore, private serviceMessage: MessageService ) { }

  ngOnInit(): void {
    this.customers.length = 0;

    this.db.collection<Customer>('customers').get().subscribe((data) => {
      data.docs.forEach((item) => {
        const customer: Customer = item.data() as Customer;
        customer.id = item.id;
        customer.ref = item.ref;
        customer.seeable = true;
        this.customers.push(customer); 
        
        this.loading = false;
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

  deleteCustomer(id: number){
    this.db.doc('customers/' + id).delete().then(() => {
      this.serviceMessage.confirmation('Eliminado', 'Registro eliminado con exito!');
      this.ngOnInit();
    }).catch(() =>{
      this.serviceMessage.error('Advertencia', 'Registro no pudo ser eliminado!');
    })
  }

}
