import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formsLogin: FormGroup;
  correctData: boolean = true;
  errorText: string = '';

  constructor(private formBuilder: FormBuilder, public auth: AngularFireAuth, 
    private spinner: NgxSpinnerService, private serviceMessage: MessageService ) { }

  ngOnInit(): void {
    this.spinner.hide();
    this.formsLogin = this.formBuilder.group({
      email:  ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    });
  }

  enterOkay(){
    if(this.formsLogin.valid){
      this.correctData = true;
      this.spinner.show();

      this.auth.signInWithEmailAndPassword(this.formsLogin.value.email, this.formsLogin.value.password)
        .then((user)=> {
          this.spinner.hide();
        })
        .catch((error) => {
          this.spinner.hide();
          this.correctData = false;
          this.errorText = error.message;

          setTimeout(() => {
            this.formsLogin.reset();
            this.ngOnInit(); 
            this.serviceMessage.error('Error', this.errorText + ' ' + 'Por favor, Intente más tarde.');
          }, 100);
        })
    }else{
      this.correctData = false;
      this.errorText = 'Por favor, revise que las credenciales sean las correctas.';
    }
  }

}
