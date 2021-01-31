import { Component, ElementRef } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: User;
  loading: boolean = true;

  constructor( public auth: AngularFireAuth, private elementRef: ElementRef ) {
    this.auth.user.subscribe((data) =>{
        this.loading = false;
        this.user = data;
    })
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#927895';
  }

}
