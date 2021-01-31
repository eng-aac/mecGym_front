import { Component, OnInit } from '@angular/core';
import { Enrolment }  from 'src/app/models/enrolment';
import { Customer } from 'src/app/models/customer';
import { Price } from 'src/app/models/price';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-enrolment',
  templateUrl: './enrolment.component.html',
  styleUrls: ['./enrolment.component.css']
})
export class EnrolmentComponent implements OnInit {

  enrolment: Enrolment = new Enrolment();
  customerSelected: Customer = new Customer();
  prices: Price[] = new Array<Price>();
  selectedPrice: Price = new Price();
  discount: number;
  idPrice: string = null;
  
  constructor( private db: AngularFirestore, private serviceMessage: MessageService,
               private router: Router ) { }

  ngOnInit(): void {
    this.db.collection<Price>('prices').get().subscribe((data) => {
      data.docs.forEach((item) => {
        const price = item.data() as Price;
        price.id = item.id;
        price.ref = item.ref;
        this.prices.push(price);
      })
    })
  }

  assignCustomer(customer: Customer){
    this.enrolment.customer = customer.ref;
    this.customerSelected = customer;
  }

  outCustomer(){
    this.customerSelected = new Customer();
    this.enrolment.customer = undefined;
  }

  saveEnrolment(){
    if(this.enrolment.validate().isValid && this.discount != undefined){

      const saveEnrolment = {
        dateStart: this.enrolment.dateStart,
        dateFinal: this.enrolment.dateFinal,
        customer: this.enrolment.customer,
        price_typeEnrolment: this.enrolment.price_typeEnrolment,
        subtotal: this.enrolment.subtotal,
        iva: this.enrolment.iva,
        discount: this.enrolment.discount,
        total: this.enrolment.total
      }

      this.db.collection<any>('enrolments').add(saveEnrolment).then((data) => {
        this.enrolment = new Enrolment();
        this.customerSelected = new Customer();
        this.selectedPrice = new Price();
        this.idPrice = null;
        this.enrolment.discount = null;
        this.router.navigate(['list-enrolment']);
        this.serviceMessage.confirmation('Insertado', 'Inscripción realizada con exito!');
      }).catch((error) => {
        console.log('Error');
        this.serviceMessage.error('Error', 'Error en el insertado, por favor intente más tarde.');
      })
    } else if(this.discount == undefined || this.discount == null || this.discount < 0){
      this.serviceMessage.error('Advertencia', 'No se pudo calcular el subtotal');
    } else {
      console.log(this.enrolment.validate().message);
      this.serviceMessage.error('Advertencia', this.enrolment.validate().message);
    }
  }
 
  selectPrice(id: String){

    if(id != null){
      this.selectedPrice = this.prices.find(x => x.id == id);
      this.enrolment.price_typeEnrolment = this.selectedPrice.ref;

      this.enrolment.dateStart = new Date();

      const year = this.enrolment.dateStart.getFullYear();
      const date: number = this.enrolment.dateStart.getDate();
      const month = this.enrolment.dateStart.getMonth();

      if(this.selectedPrice.type_duration == 'Día'){
        const dates: number = this.selectedPrice.duration;
        const finalDate = new Date(year, month, date + dates);
        this.enrolment.dateFinal = finalDate;
      }

      if(this.selectedPrice.type_duration == 'Semana'){
        const dates: number = this.selectedPrice.duration * 7;
        const finalDate = new Date(year, month, date + dates);
        this.enrolment.dateFinal = finalDate;
      }

      if(this.selectedPrice.type_duration == 'Quincena'){
        const dates: number = this.selectedPrice.duration * 15;
        const finalDate = new Date(year, month, date + dates);
        this.enrolment.dateFinal = finalDate;
      }

      if(this.selectedPrice.type_duration == 'Mes'){
        const months = this.selectedPrice.duration;
        const finalDate = new Date(year, month + months, date);
        this.enrolment.dateFinal = finalDate;
      }

      if(this.selectedPrice.type_duration == 'Año'){
        const years = this.selectedPrice.duration;
        const finalDate = new Date(year + years, month, date);
        this.enrolment.dateFinal = finalDate;
      }

      this.enrolment.subtotal = this.selectedPrice.cost;
      this.enrolment.iva = this.enrolment.subtotal * 0.21;

      if(this.discount == null){
        this.discount = 0;
      }

      this.enrolment.discount = this.discount;
      this.enrolment.total = this.enrolment.subtotal + this.enrolment.iva - this.enrolment.discount; 

    } else {
      this.selectedPrice = new Price();

      this.enrolment.price_typeEnrolment = null;

      this.enrolment.dateStart = null;
      this.enrolment.dateFinal = null;

      this.enrolment.subtotal = 0;
      this.enrolment.iva = 0;
      this.enrolment.total = 0; 
    }
  }

  calculateTotal(discount: number){
    if(discount != null && discount >= 0){
      this.enrolment.discount = discount;
      this.enrolment.total = this.enrolment.subtotal + this.enrolment.iva - this.enrolment.discount; 
    } else {
      this.serviceMessage.error('Advertencia', 'No ha ingresado el descuento ó es inválido');
      this.enrolment.total = 0;
    }
  }

  clean(): void{
    this.enrolment = new Enrolment ();

    this.customerSelected = new Customer();
    this.outCustomer();

    this.prices = new Array<Price>();
    this.selectedPrice = new Price();
    this.idPrice = null;
    this.discount = 0;
    this.selectPrice(this.idPrice);
    
    this.ngOnInit();
  }
    
}
