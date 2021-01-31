import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  formsCustomer: FormGroup;
  percentage: number = 0;
  urlImage: string = '';
  isEdit: boolean = false;
  ID: string;
  titleForm: string = 'Agregar Cliente';

  constructor( private formBuilder: FormBuilder, private storage: AngularFireStorage, 
    private db: AngularFirestore, private activatedRoute: ActivatedRoute,
    private serviceMessage: MessageService, private router: Router, private location: Location ) { }

  ngOnInit(): void {

    this.formsCustomer = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      identityCard: ['', Validators.required],
      birthday: ['', Validators.required],
      cellPhoneNumer: ['', Validators.required],
      imgUrl: ['', Validators.required]
    })

    this.ID = this.activatedRoute.snapshot.params.customerID;

    if(this.ID != undefined){
      this.titleForm = 'Editar Cliente';
      this.isEdit = true;
      this.db.doc<any>('customers/' + this.ID).valueChanges().subscribe((data) => {
        this.formsCustomer.setValue({
          name: data.name,
          surname: data.surname,
          email: data.email,
          identityCard: data.identityCard,
          birthday: new Date(data.birthday.seconds * 1000).toISOString().substr(0, 10),
          cellPhoneNumer: data.cellPhoneNumer,
          imgUrl: ''
        })
        this.urlImage = data.imgUrl;
        this.percentage = 100;
        
      });
    }
   
  }

  post(){
    this.formsCustomer.value.imgUrl = this.urlImage;
    this.formsCustomer.value.birthday = new Date(this.formsCustomer.value.birthday);
    this.db.collection('customers').add(this.formsCustomer.value).then((data) => {
      this.serviceMessage.confirmation('Agregado', 'Registro creado con exito!');
      this.formsCustomer.reset();
      this.percentage = 0;
      this.router.navigate(['enrolment']);
    }).catch(() => {
      console.log('Error');
      this.serviceMessage.error('Error', 'Lo sentimos ocurrió un error, por favor intente mas tarde.');
    })
  }

  put(){
    this.formsCustomer.value.imgUrl = this.urlImage;
    this.formsCustomer.value.birthday = new Date(this.formsCustomer.value.birthday);

    this.db.doc('customers/' + this.ID).update(this.formsCustomer.value).then((data) =>{
      this.serviceMessage.confirmation('Actualización', 'Registro modificado con exito!');
      this.router.navigate(['list-customer']);
      this.formsCustomer.reset(); 
      this.isEdit = false;
      this.percentage = 0;
    }).catch(() =>{
      console.log('Error');
      this.serviceMessage.error('Error', 'Lo sentimos ocurrió un error, por favor intente mas tarde.');
    });
  }

  uploadImg(event) {
    if(event.target.files.length > 0) {
      const imgName = new Date().getTime().toString();
      const img = event.target.files[0];
      const extension = img.name.toString().substring(img.name.toString().lastIndexOf('.'));
      const imgPath = 'customers/' + imgName + extension;
      const ref = this.storage.ref(imgPath);
      const task = ref.put(img);

      task.then((data) =>{
        ref.getDownloadURL().subscribe((data) => {
          this.urlImage = data;
        })
      })

      task.percentageChanges().subscribe((data) =>{
        this.percentage = data;
      })
    } 
  }

  clean(){
    this.percentage = 0;
    this.formsCustomer.reset();
  }

  cancel(): void{
    this.location.back();
  }

}
