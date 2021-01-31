import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase/app';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  user: User; 
  users: string = '';
  
  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.user.subscribe((data) =>{
      this.user = data;

      if (this.user != null) {
        this.users = this.user.email.substring(this.user.email.indexOf('@'),0);;
      } else {
        this.users = 'Admin';
      }
      
    })
  }

  logout() {
    this.auth.signOut();
  }

}
