import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MessageService } from 'src/app/service/message.service';
import { Price }  from 'src/app/models/price';


@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {

  formsPrices:  FormGroup;
  prices: Price[] = new Array<Price>();
  isEdit: boolean = false;
  id: String;
  loading: boolean = true;
  titleForm: string = 'Agregar Actividad';
  pages: number = 1;

  constructor( private formBuilder: FormBuilder, private db: AngularFirestore, 
               private serviceMessage: MessageService ) { }

  ngOnInit(): void {
    this.formsPrices = this.formBuilder.group({
      name: ['', Validators.required],
      cost: ['', Validators.required],
      duration: ['', Validators.required],
      type_duration: ['null', Validators.required]
    })
    this.showPrice();
  }

  showPrice(){
    this.db.collection<Price>('prices').get().subscribe((result) => {
      this.prices.length = 0;
      result.docs.forEach((data) => {
        const price = data.data() as Price;
        price.id = data.id;
        price.ref = data.ref;
        price.seeable = true;
        this.prices.push(price);
        this.loading = false;
      })
    })
  }

  addPrice(){
    this.db.collection<Price>('prices').add(this.formsPrices.value).then(() => {
      this.serviceMessage.confirmation('Agregado', 'Precio agregado con exito!');
      this.formsPrices.reset();
      this.showPrice();
    }).catch(() => {
      this.serviceMessage.error('Error', 'Error en la inserción, por favor intente más tarde.');
    })
  }

  viewPrice(price: Price){
    this.titleForm = 'Editar Actividad';
    this.isEdit = true;
    this.formsPrices.setValue({
      name: price.name,
      cost: price.cost,
      duration: price.duration,
      type_duration: price.type_duration
    })

    this.id = price.id;                             
  }

  putPrice(){
    this.db.doc('prices/' + this.id).update(this.formsPrices.value).then(() => {
      this.serviceMessage.confirmation('Modificado', 'Precio modificado con exito!');
      this.formsPrices.reset();
      this.isEdit = false;
      this.showPrice();
    }).catch(() => {
      this.serviceMessage.error('Error', 'Error en la modificación, por favor intente más tarde.');
    })
  }

  clean(){
    this.formsPrices.reset();
  }

  cancel(){
    this.titleForm = 'Agregar Actividad';
    this.isEdit = false;
    this.ngOnInit();
  }

  browsePrice(name: String){
    this.prices.forEach((data) => {
      if(data.name.toLowerCase().includes(name.toLowerCase())){
        data.seeable = true;
      }else{
        data.seeable = false;
      }
    })
  }

  deletePrice(id: number){
    this.db.doc('prices/' + id).delete().then(() => {
      this.serviceMessage.confirmation('Eliminado', 'Registro eliminado con exito!');
      this.ngOnInit();
    }).catch(() =>{
      this.serviceMessage.error('Advertencia', 'Registro no pudo ser eliminado!');
    })
  }

}
